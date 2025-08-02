// UserListPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import UserListPage from '../../pages/UserListPage';
import { MemoryRouter } from 'react-router-dom';

it('renders the user list page', () => {
  render(<MemoryRouter><UserListPage /></MemoryRouter>);
});
it('shows loading spinner when loading', () => {
  // Mock useUsersStore to return loading true
  vi.mock('../../hooks/useUsersStore', () => ({
    useUsersStore: () => ({
      users: [],
      loading: true,
      error: null,
      fetchAndSetUsers: vi.fn(),
    }),
  }));
  // Re-import after mocking
  const UserListPageWithMock = require('../../pages/UserListPage').default;
  render(<MemoryRouter><UserListPageWithMock /></MemoryRouter>);
  expect(screen.getByRole('status')).toBeInTheDocument();
  vi.resetModules();
});

it('shows error alert when error exists', () => {
  vi.mock('../../hooks/useUsersStore', () => ({
    useUsersStore: () => ({
      users: [],
      loading: false,
      error: 'Failed to fetch users',
      fetchAndSetUsers: vi.fn(),
    }),
  }));
  const UserListPageWithMock = require('../../pages/UserListPage').default;
  render(<MemoryRouter><UserListPageWithMock /></MemoryRouter>);
  expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
  vi.resetModules();
});

it('filters users by search input', async () => {
  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@brown.com' },
  ];
  vi.mock('../../hooks/useUsersStore', () => ({
    useUsersStore: () => ({
      users,
      loading: false,
      error: null,
      fetchAndSetUsers: vi.fn(),
    }),
  }));
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const UserListPageWithMock = require('../../pages/UserListPage').default;
  render(<MemoryRouter><UserListPageWithMock /></MemoryRouter>);

  // All users should be present initially
  expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  expect(screen.getByText('Bob Jones')).toBeInTheDocument();
  expect(screen.getByText('Charlie Brown')).toBeInTheDocument();

  // Type in the search input
  const searchInput = screen.getByRole('search');
  fireEvent.change(searchInput, { target: { value: 'bob' } });

  // Wait for debounce (250ms)
  await new Promise((r) => setTimeout(r, 300));

  // Only Bob Jones should be visible
  expect(screen.getByText('Bob Jones')).toBeInTheDocument();
  expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
  expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();

  vi.resetModules();
});
