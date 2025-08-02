import React, { useEffect, useMemo, useState } from 'react';
import { useUsersStore } from '../hooks/useUsersStore';
import UserTable from '../components/UserTable/UserTable';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import ErrorAlert from '../components/Shared/ErrorAlert';
import { debounce } from 'lodash'; 
import { Search } from 'lucide-react';
import { Input } from '@mui/material';
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex gap-2 w-full ">
          <Input
            type="search"
            role="search"
            aria-label="Search users by name or email"
            placeholder="Search..."
            className="border rounded px-3 py-2 bg-background w-[30%]"
            onChange={(e: { target: { value: string; }; }) => onSearchChange(e.target.value)}
            endAdornment={<Search className="text-muted-foreground" />}
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <UserTable users={filtered} />
    </div>
  );
};

export default UserListPage;
