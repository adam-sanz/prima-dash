import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useQuery } from './useQuery';

describe('useQuery', () => {
  it('should return loading state initially', () => {
    const mockFn = vi.fn(() => Promise.resolve('data'));
    const { result } = renderHook(() => useQuery(mockFn, []));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockFn = vi.fn(() => Promise.resolve(mockData));

    const { result } = renderHook(() => useQuery(mockFn, []));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    const mockFn = vi.fn(() => Promise.reject(mockError));

    const { result } = renderHook(() => useQuery(mockFn, []));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  /* TODO: Add tests for AbortSignal functionality */
  /* TODO: Add tests for cleanup on unmount */
  /* TODO: Add tests for dependency change refetching */
  /* TODO: Add tests for concurrent request cancellation */
});
