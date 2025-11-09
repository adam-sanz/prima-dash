import type { User } from '@/features/users/types/user.types';
import styles from './UserCard.module.css';

/*
 * Displays a user card with avatar, name, email, and role badge
 *
 * @param user - The user object to display
 * @param onClick - Callback function called when the card is clicked, receives the user object
 *
 * @example
 * ```tsx
 * <UserCard
 *   user={user}
 *   onClick={(user) => setSelectedUser(user)}
 * />
 * ```
 */
interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <button
      className={styles.card}
      onClick={() => onClick(user)}
      aria-label={`View details for ${user.name}`}
    >
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className={styles.avatar}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
        <span className={`${styles.role} ${styles[user.role.toLowerCase()]}`}>
          {user.role}
        </span>
      </div>
    </button>
  );
}
