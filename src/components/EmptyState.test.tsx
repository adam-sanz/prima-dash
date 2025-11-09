import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with message', () => {
    render(<EmptyState message="No data found" />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders with message and description', () => {
    render(
      <EmptyState
        message="No users found"
        description="Try adjusting your filters"
      />,
    );
    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  /* TODO: Add tests for custom icon rendering */
  /* TODO: Add tests for accessibility attributes */
});
