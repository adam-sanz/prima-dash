/**
 * Users API layer with pagination metadata
 * Returns both enriched users and pagination information
 */

import { API_CONFIG } from '@/config/constants';
import { enrichUsers } from '@/features/users/utils/enrichUsers';
import type {
  DummyJSONResponse,
  User,
  PaginationParams,
  Role,
} from '@/features/users/types/user.types';

export interface UsersWithPaginationResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserFilterParams {
  searchTerm?: string;
  role?: Role | 'all';
}

/**
 * Determines the best endpoint based on active filters
 * Priority: search > role filter > no filters
 */
function buildEndpoint(
  params: PaginationParams,
  filters?: UserFilterParams,
): string {
  const { limit, skip } = params;
  const hasSearch = filters?.searchTerm && filters.searchTerm.trim() !== '';
  const hasRoleFilter = filters?.role && filters.role !== 'all';

  if (hasSearch) {
    return `${API_CONFIG.ENDPOINTS.USERS}/search?q=${encodeURIComponent(filters.searchTerm!)}&limit=${limit}&skip=${skip}`;
  }

  if (hasRoleFilter) {
    const roleMap: Record<string, string> = {
      admin: 'admin',
      editor: 'moderator',
      viewer: 'user',
    };
    const apiRoleValue = roleMap[filters.role!.toLowerCase()] || 'user';
    return `${API_CONFIG.ENDPOINTS.USERS}/filter?key=role&value=${apiRoleValue}&limit=${limit}&skip=${skip}`;
  }

  return `${API_CONFIG.ENDPOINTS.USERS}?limit=${limit}&skip=${skip}`;
}

/**
 * Applies client-side filtering for cases where server-side filtering is incomplete
 * Used when both search + role filters are active (only one can be server-side)
 */
function applyClientSideFilters(
  users: User[],
  filters?: UserFilterParams,
): User[] {
  if (!filters) return users;

  return users.filter((user) => {
    const hasSearch = filters.searchTerm && filters.searchTerm.trim() !== '';
    const hasRoleFilter = filters.role && filters.role !== 'all';

    if (hasSearch && hasRoleFilter) {
      return user.role === filters.role;
    }

    return true;
  });
}

/* TODO: Add request cancellation for concurrent requests */
/* TODO: Add retry logic for failed requests */

/**
 * Fetch users from the DummyJSON
 * Supports server-side search and role filtering using DummyJSON endpoints
 * Returns enriched users (sorted alphabetically) along with pagination metadata
 */
export async function getUsersWithPagination(
  signal?: AbortSignal,
  params?: PaginationParams,
  filters?: UserFilterParams,
): Promise<UsersWithPaginationResponse> {
  const paginationParams = params || { limit: 30, skip: 0 };
  const endpoint = buildEndpoint(paginationParams, filters);

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const response: DummyJSONResponse = await res.json();

  let enrichedUsers = enrichUsers(response.users);

  enrichedUsers = applyClientSideFilters(enrichedUsers, filters);

  const sortedUsers = enrichedUsers.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return {
    users: sortedUsers,
    total: response.total,
    skip: response.skip,
    limit: response.limit,
  };
}
