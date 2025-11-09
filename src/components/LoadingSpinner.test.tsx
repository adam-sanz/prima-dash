import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Loading users..." />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<LoadingSpinner />);
    const statusElement = container.querySelector('[role="status"]');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('aria-live', 'polite');
  });

  /* TODO: Add test for animation behavior */
  /* TODO: Add tests for different size variants rendering correctly */
});
