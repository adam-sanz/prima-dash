/**
 * Generic data fetching hook
 * Accepts any async function and manages loading/error/data states
 */

import { useState, useEffect } from 'react';

interface UseQueryResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Generic hook for fetching data with any async function
 *
 * @param queryFn - Async function that returns data (receives AbortSignal)
 * @param deps - Dependencies array to trigger refetch
 * @returns Object containing data, error, and isLoading states
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useQuery(
 *   (signal) => apiClient.get<User[]>('/users', signal),
 *   []
 * );
 * ```
 */
export function useQuery<T>(
  queryFn: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList = [],
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);

    queryFn(abortController.signal)
      .then((result) => setData(result))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err : new Error('Request failed'));
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => abortController.abort();
  }, deps);

  return { data, error, isLoading };
}
