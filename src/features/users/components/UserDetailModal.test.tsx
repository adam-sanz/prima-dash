import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserDetailModal } from './UserDetailModal';
import type { User } from '../types/user.types';

describe('UserDetailModal', () => {
  const mockUser: User = {
    id: 1,
    name: 'Adam Bobza',
    username: 'johnd',
    email: 'adam@google.com',
    address: {
      street: 'Worcester St',
      city: 'London',
      state: 'Greater London',
      zipcode: 'SW1A 1AA',
      country: 'United Kingdom',
    },
    phone: '+44 20 1234 5678',
    company: {
      name: 'Tech Corp',
      title: 'Engineer',
      department: 'Engineering',
    },
    university: 'University of London',
    role: 'Admin',
    status: 'active',
    avatar: 'https://image.com/avatar',
  };

  it('should render user details', () => {
    const mockOnClose = vi.fn();
    render(<UserDetailModal user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText('Adam Bobza')).toBeTruthy();
    expect(screen.getByText('adam@google.com')).toBeTruthy();
  });

  it('should have close button', () => {
    const mockOnClose = vi.fn();
    render(<UserDetailModal user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByLabelText('Close modal')).toBeTruthy();
  });

  /* TODO: Add test for escape key closing modal */
  /* TODO: Add test for overlay click closing modal */
  /* TODO: Add test for focus trap functionality */
});
