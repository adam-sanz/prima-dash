import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  error: Error | string;
  title?: string;
  onRetry?: () => void;
}

/**
 * Reusable error display component
 *
 * Features:
 * - Accessible with role="alert"
 * - Clear visual hierarchy with icon
 * - Optional retry button
 * - Handles both Error objects and string messages
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   error={error}
 *   title="Failed to load users"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export function ErrorDisplay({
  error,
  title = 'An error occurred',
  onRetry,
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className={styles.container} role="alert">
      <svg
        className={styles.icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{errorMessage}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className={styles.retryButton}>
          Try Again
        </button>
      ) : null}
    </div>
  );
}
