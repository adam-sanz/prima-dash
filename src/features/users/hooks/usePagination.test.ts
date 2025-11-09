import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should initialise with page 1', () => {
    const { result } = renderHook(() => usePagination(30));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationParams).toEqual({
      limit: 30,
      skip: 0,
    });
  });

  it('should calculate skip/limit correctly', () => {
    const { result } = renderHook(() => usePagination(10));

    /* Page 1: skip=0, limit=10 */
    expect(result.current.paginationParams).toEqual({
      limit: 10,
      skip: 0,
    });

    /* Page 2: skip=10, limit=10 */
    act(() => {
      result.current.goToPage(2);
    });
    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginationParams).toEqual({
      limit: 10,
      skip: 10,
    });
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination(30));

    act(() => {
      result.current.goToPage(0);
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationParams.skip).toBe(0);
  });

  it('should reset to page 1', () => {
    const { result } = renderHook(() => usePagination(30));

    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(5);

    act(() => {
      result.current.resetPagination();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginationParams).toEqual({
      limit: 30,
      skip: 0,
    });
  });

  /* TODO: Add tests for custom itemsPerPage values */
  /* TODO: Add tests for edge cases like large page numbers */
});
