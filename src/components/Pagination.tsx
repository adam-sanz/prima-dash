import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

/**
 * Reusable pagination component
 * Displays page navigation with Previous/Next buttons and page numbers
 */
export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxVisiblePages = 7,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <nav
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <div className={styles.pages}>
        {showStartEllipsis && (
          <>
            <button
              className={styles.pageButton}
              onClick={() => onPageChange(1)}
              aria-label="Go to page 1"
            >
              1
            </button>
            <span className={styles.ellipsis} aria-hidden="true">
              ...
            </span>
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {showEndEllipsis && (
          <>
            <span className={styles.ellipsis} aria-hidden="true">
              ...
            </span>
            <button
              className={styles.pageButton}
              onClick={() => onPageChange(totalPages)}
              aria-label={`Go to page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
}
