import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  /** Optional message to display below the spinner */
  message?: string;
  /** Size variant of the spinner */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Reusable loading spinner component
 *
 * Features:
 * - Accessible with role="status" and aria-live="polite"
 * - Configurable size and message
 * - Animated spinner with smooth rotation
 *
 * @example
 * ```tsx
 * <LoadingSpinner message="Loading users..." />
 * <LoadingSpinner size="small" />
 * ```
 */
export function LoadingSpinner({
  message = 'Loading...',
  size = 'medium',
}: LoadingSpinnerProps) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
