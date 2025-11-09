import type { Role } from '@/features/users/types/user.types';
import styles from './UserFilters.module.css';

/*
 * Filter controls for user list (search by name and filter by role)
 *
 * @param searchTerm - Current search term value
 * @param onSearchChange - Callback when search input changes
 * @param selectedRole - Currently selected role filter ('all' or specific role)
 * @param onRoleChange - Callback when role filter changes
 * @param onClearFilters - Callback to clear all active filters
 *
 * @example
 * ```tsx
 * <UserFilters
 *   searchTerm={search}
 *   onSearchChange={setSearch}
 *   selectedRole={role}
 *   onRoleChange={setRole}
 *   onClearFilters={handleClear}
 * />
 * ```
 */
interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRole: Role | 'all';
  onRoleChange: (role: Role | 'all') => void;
  onClearFilters: () => void;
}

const ROLES: Array<Role | 'all'> = ['all', 'Admin', 'Editor', 'Viewer'];

export function UserFilters({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  onClearFilters,
}: UserFiltersProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <label htmlFor="search" className={styles.label} tabIndex={0}>
          Search by name
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.search}
          aria-label="Search users by name"
        />
      </div>

      <div className={styles.roleWrapper}>
        <div className={styles.roleHeader}>
          <label htmlFor="role-filter" className={styles.label} tabIndex={0}>
            Filter by role
          </label>
          {(searchTerm || selectedRole !== 'all') && (
            <button
              onClick={onClearFilters}
              className={styles.clearButton}
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          )}
        </div>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value as Role | 'all')}
          className={styles.select}
          aria-label="Filter users by role"
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role === 'all' ? 'All Roles' : role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
