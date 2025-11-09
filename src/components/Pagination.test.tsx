import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('should not render when only one page', () => {
    const mockOnPageChange = vi.fn();
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={10}
        itemsPerPage={20}
        onPageChange={mockOnPageChange}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render Previous and Next buttons', () => {
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={100}
        itemsPerPage={10}
        onPageChange={mockOnPageChange}
      />,
    );
    expect(screen.getByText('Previous')).toBeTruthy();
    expect(screen.getByText('Next')).toBeTruthy();
  });

  /* TODO: Add tests for page number click handlers */
  /* TODO: Add tests for disabled states on first/last page */
  /* TODO: Add tests for ellipsis rendering logic */
});
