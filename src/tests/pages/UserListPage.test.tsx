// UserListPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

let mockStore: {
  users: Array<{ id: number; name: string; email: string }>;
  loading: boolean;
  error: string | null;
  fetchAndSetUsers: ReturnType<typeof vi.fn>;
};

vi.mock('../../hooks/useUsersStore', () => ({
  useUsersStore: () => mockStore,
}));

import UserListPage from '../../pages/UserListPage';

describe('UserListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the user list page', () => {
    mockStore = { users: [], loading: false, error: null, fetchAndSetUsers: vi.fn() };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    mockStore = { users: [], loading: true, error: null, fetchAndSetUsers: vi.fn() };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error alert when error exists', () => {
    mockStore = { users: [], loading: false, error: 'Failed to fetch users', fetchAndSetUsers: vi.fn() };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
  });

  it('filters users by search input', async () => {
    mockStore = {
      users: [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
        { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@brown.com' },
      ],
      loading: false,
      error: null,
      fetchAndSetUsers: vi.fn(),
    };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);

    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'bob' } });
    await waitFor(() =>
      expect(screen.getByLabelText('User Table')).toHaveAttribute('aria-rowcount', '2')
    );
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
  });

  it('calls fetchAndSetUsers on mount when store is empty', async () => {
    const fetchAndSetUsers = vi.fn();
    mockStore = { users: [], loading: false, error: null, fetchAndSetUsers };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    await waitFor(() => expect(fetchAndSetUsers).toHaveBeenCalled());
  });

  it('does not call fetchAndSetUsers when users exist', async () => {
    const fetchAndSetUsers = vi.fn();
    mockStore = {
      users: [{ id: 1, name: 'Jane', email: 'jane@example.com' }],
      loading: false,
      error: null,
      fetchAndSetUsers,
    };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    await waitFor(() => expect(fetchAndSetUsers).not.toHaveBeenCalled());
  });

  it('filters users by search input matching email case-insensitively', async () => {
    mockStore = {
      users: [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
        { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@brown.com' },
      ],
      loading: false,
      error: null,
      fetchAndSetUsers: vi.fn(),
    };
    render(<MemoryRouter><UserListPage /></MemoryRouter>);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'BROWN.COM' } });
    await waitFor(() =>
      expect(screen.getByLabelText('User Table')).toHaveAttribute('aria-rowcount', '2')
    );
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
  });
});
