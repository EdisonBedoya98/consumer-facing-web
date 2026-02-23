import { useState, useEffect, useMemo } from 'react';
import { fetchUsersApi } from '../services/usersService';
import type { InternalUser } from '../types/user';

interface UseUsersResult {
  users: InternalUser[];
  filteredUsers: InternalUser[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<InternalUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let active = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsersApi();
        
        if (active) {
          const mappedUsers: InternalUser[] = data.map((user) => ({
            id: String(user.id),
            name: user.name,
            email: user.email,
            company: user.company.name,
          }));
          
          setUsers(mappedUsers);
        }
      } catch (err: unknown) {
        if (active) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred while fetching users');
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      active = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
