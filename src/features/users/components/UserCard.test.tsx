import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from './UserCard';
import type { User } from '../types/user.types';

describe('UserCard', () => {
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

  it('should render user name and email', () => {
    const mockOnClick = vi.fn();
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByText('Adam Bobza')).toBeTruthy();
    expect(screen.getByText('adam@google.com')).toBeTruthy();
  });

  it('should render user role badge', () => {
    const mockOnClick = vi.fn();
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByText('Admin')).toBeTruthy();
  });

  /* TODO: Add test for click handler invocation */
  /* TODO: Add tests for different role badge styles */
});
