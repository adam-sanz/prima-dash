import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorDisplay } from './ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renders with Error object', () => {
    const error = new Error('Something went wrong');
    render(<ErrorDisplay error={error} />);
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('renders with string error', () => {
    render(<ErrorDisplay error="String error message" />);
    expect(screen.getByText('String error message')).toBeTruthy();
  });

  it('has proper accessibility attributes', () => {
    const error = new Error('Test error');
    const { container } = render(<ErrorDisplay error={error} />);
    const alertElement = container.querySelector('[role="alert"]');
    expect(alertElement).toBeTruthy();
  });

  /* TODO: Add tests for retry button click handler */
  /* TODO: Add tests for custom title rendering */
});
