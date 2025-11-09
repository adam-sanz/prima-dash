import { useState, useCallback } from 'react';
import type { PaginationParams } from '@/features/users/types/user.types';

export interface UsePaginationReturn {
  currentPage: number;
  paginationParams: PaginationParams;
  goToPage: (page: number) => void;
  resetPagination: () => void;
}

/*
 * Hook for managing pagination
 * Calculates skip/limit params from current page and items per page
 */
export function usePagination(itemsPerPage: number = 30): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationParams: PaginationParams = {
    limit: itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage,
  };

  /* useCallback needed to prevent infinite loops when used in useEffect dependencies */
  const goToPage = useCallback(
    (page: number) => setCurrentPage(Math.max(1, page)),
    [],
  );

  const resetPagination = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    paginationParams,
    goToPage,
    resetPagination,
  };
}
