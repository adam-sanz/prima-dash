import { useState, useEffect } from 'react';
import { useQuery } from '@/shared/hooks/useQuery';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
  getUsersWithPagination,
  type UsersWithPaginationResponse,
} from '@/features/users/api/getUsersWithPagination';
import { usePagination } from '@/features/users/hooks/usePagination';
import { UserFilters } from '@/features/users/components/UserFilters';
import { UserList } from '@/features/users/components/UserList';
import { UserDetailModal } from '@/features/users/components/UserDetailModal';
import { Pagination } from '@/components/Pagination';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { APP_CONFIG } from '@/config/constants';
import type { User, Role } from '@/features/users/types/user.types';
import './App.css';

/* TODO: Add integration tests for full user flow */
function AppContent() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | 'all'>('all');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const hasActiveFilters = searchTerm !== '' || selectedRole !== 'all';

  const { currentPage, paginationParams, goToPage, resetPagination } =
    usePagination(20);

  const {
    data: response,
    error,
    isLoading,
  } = useQuery<UsersWithPaginationResponse>(
    (signal: AbortSignal) => {
      const filters = {
        searchTerm: debouncedSearchTerm || undefined,
        role: selectedRole !== 'all' ? selectedRole : undefined,
      };
      return getUsersWithPagination(signal, paginationParams, filters);
    },
    [
      debouncedSearchTerm,
      selectedRole,
      paginationParams.limit,
      paginationParams.skip,
    ],
  );

  const users = response?.users ?? [];

  const totalUsers = response?.total ?? 0;
  const displayStart = response?.skip ? response.skip + 1 : 1;
  const displayEnd = response
    ? Math.min(response.skip + response.limit, totalUsers)
    : 0;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    resetPagination();
  };

  useEffect(() => {
    resetPagination();
  }, [debouncedSearchTerm, selectedRole, resetPagination]);

  return (
    <div className="app">
      <header
        className="header"
        role="banner"
        aria-label={`${APP_CONFIG.NAME} header`}
      >
        <div className="container">
          <h1 className="title" tabIndex={0}>
            {APP_CONFIG.NAME}
          </h1>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <UserFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            onClearFilters={clearFilters}
          />

          <UserList
            users={users}
            onUserClick={setSelectedUser}
            isLoading={isLoading}
            error={error}
          />

          {!isLoading && !error && totalUsers > 0 ? (
            <>
              <div style={{ textAlign: 'center' }}>
                <div
                  tabIndex={0}
                  className="resultsCount"
                  role="status"
                  aria-live="polite"
                >
                  Showing {displayStart}-{displayEnd} of {totalUsers}{' '}
                  {hasActiveFilters ? 'filtered ' : ''}users
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={totalUsers}
                itemsPerPage={paginationParams.limit}
                onPageChange={goToPage}
              />
            </>
          ) : null}
        </div>
      </main>

      {selectedUser ? (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      ) : null}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
