import React, { useEffect, useMemo, useState } from 'react';
import { useUsersStore } from '../hooks/useUsersStore';
import UserTable from '../components/UserTable/UserTable';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import ErrorAlert from '../components/Shared/ErrorAlert';
import { debounce } from 'lodash'; 
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
const UserListPage: React.FC = () => {
  const { users, loading, error, fetchAndSetUsers } = useUsersStore();
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (users.length === 0) fetchAndSetUsers();
  }, [fetchAndSetUsers, users.length]);

  const filtered = useMemo(() => {
    return users
      .filter((u) => {
        const term = search.toLowerCase();
        return (
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
        );
      })
      
  }, [users, search]);

  // Debounced input
  const onSearchChange = useMemo(
    () =>
      debounce((v: string) => {
        setSearch(v);
      }, 250),
    []
  );

  useEffect(() => {
    return () => {
      onSearchChange.cancel();
    };
  }, [onSearchChange]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex gap-2 w-full">
          <div className="relative w-full sm:w-[30%]">
            <Input
              type="search"
              role="search"
aria-label="Search users by name or email"
              placeholder="Search..."
              className="bg-background pr-8"
              onChange={(e: { target: { value: string } }) =>
                onSearchChange(e.target.value)
              }
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <UserTable users={filtered} />
    </div>
  );
};

export default UserListPage;
