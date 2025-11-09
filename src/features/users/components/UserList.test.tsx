import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserList } from './UserList';
import type { User } from '../types/user.types';

describe('UserList', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Alice Smith',
      username: 'alice',
      email: 'alice@smith.com',
      address: {
        street: '123 St',
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
    },
  ];

  it('should render loading state', () => {
    const mockOnUserClick = vi.fn();
    render(
      <UserList users={[]} onUserClick={mockOnUserClick} isLoading={true} />,
    );

    expect(screen.getByText(/Loading users/i)).toBeTruthy();
  });

  it('should render empty state', () => {
    const mockOnUserClick = vi.fn();
    render(
      <UserList users={[]} onUserClick={mockOnUserClick} isLoading={false} />,
    );

    expect(screen.getByText(/No users found/i)).toBeTruthy();
  });

  it('should render user cards', () => {
    const mockOnUserClick = vi.fn();
    render(
      <UserList
        users={mockUsers}
        onUserClick={mockOnUserClick}
        isLoading={false}
      />,
    );

    expect(screen.getByText('Alice Smith')).toBeTruthy();
  });

  /* TODO: Add test for error state rendering */
  /* TODO: Add tests for user interaction flows */
});
