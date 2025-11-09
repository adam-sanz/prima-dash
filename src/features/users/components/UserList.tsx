import type { User } from '@/features/users/types/user.types';
import { UserCard } from '@/features/users/components/UserCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import styles from './UserList.module.css';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  isLoading?: boolean;
  error?: Error | null;
}

/* TODO: Add virtualisation for large lists */
export function UserList({
  users,
  onUserClick,
  isLoading,
  error,
}: UserListProps) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner message="Loading users..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorDisplay error={error} title="Error loading users" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState message="No users found" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onClick={onUserClick} />
        ))}
      </div>
    </div>
  );
}
