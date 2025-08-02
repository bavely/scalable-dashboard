import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useUsersStore } from '../../hooks/useUsersStore';
import { apiService } from '../../api/apiService';
import type { User } from '../../types';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice',
    username: 'alice',
    email: 'alice@example.com',
    phone: '123-456',
    website: 'alice.com',
    address: {
      street: 'Main',
      suite: 'Apt 1',
      city: 'Town',
      zipcode: '12345',
      geo: { lat: '0', lng: '0' },
    },
    company: {
      name: 'Alice Co',
      catchPhrase: 'Doing things',
      bs: 'stuff',
    },
  },
];

beforeEach(() => {
  useUsersStore.setState({ users: [], loading: false, error: null });
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useUsersStore', () => {
  it('fetchAndSetUsers stores fetched users', async () => {
    vi.spyOn(apiService, 'fetchUsers').mockResolvedValue(mockUsers);

    await useUsersStore.getState().fetchAndSetUsers();

    expect(apiService.fetchUsers).toHaveBeenCalled();
    expect(useUsersStore.getState().users).toEqual(mockUsers);
    expect(useUsersStore.getState().loading).toBe(false);
    expect(useUsersStore.getState().error).toBeNull();
  });

  it('addUser prepends a user to the store', () => {
    const existingUser: User = { ...mockUsers[0], id: 2, name: 'Bob' };
    useUsersStore.setState({ users: [existingUser], loading: false, error: null });

    const newUser: User = { ...mockUsers[0], id: 3, name: 'Carol' };
    useUsersStore.getState().addUser(newUser);

    const users = useUsersStore.getState().users;
    expect(users[0]).toEqual(newUser);
    expect(users).toHaveLength(2);
  });
});
