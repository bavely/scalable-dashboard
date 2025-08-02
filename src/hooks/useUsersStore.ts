import { create } from 'zustand';
import type { User } from '../types';
import { apiService } from '../api/apiService';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchAndSetUsers: () => Promise<void>;
  addUser: (user: User) => void;
  setSearch: (term: string) => void; // for derived usage maybe
}

export const useUsersStore = create<UsersState>()(
  persist( 
  (set) => ({
    users: [],
    loading: false,
    error: null,
    fetchAndSetUsers: async () => {
      set({ loading: true, error: null });
      try {
        const users = await apiService.fetchUsers();
        set({ users, loading: false });
      } catch (e: unknown) {
        if (e instanceof Error) {
          set({ error: e.message, loading: false });
        } else {
          set({ error: 'Something went wrong. Please try again later.', loading: false });
        }
      }
    },
    addUser: (user) =>
      set((state) => ({ users: [user, ...state.users] })),
    setSearch: () => {}, // placeholder if needed
  }),
  {
    name: 'users-store',
    storage: createJSONStorage(() => localStorage),
  }
)
);
