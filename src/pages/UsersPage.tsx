import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../components/UserCard";
import { UsersError } from "../components/UsersPage/UsersError";
import { UsersEmpty } from "../components/UsersPage/UsersEmpty";
import { UsersLoading } from "../components/UsersPage/UsersLoading";
import { SelectedUserNotification } from "../components/UsersPage/SelectedUserNotification";

export const UsersPage: React.FC = () => {
  const { filteredUsers, loading, error, searchQuery, setSearchQuery } =
    useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [viewVariant, setViewVariant] = useState<"compact" | "detailed">(
    "compact",
  );

  const handleSelect = (id: string) => {
    setSelectedUserId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-5xl space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Users Directory
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and search through the user list.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                aria-label="Filter users by name"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
              <button
                type="button"
                className={twMerge(
                  "relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold transition-colors",
                  viewVariant === "compact"
                    ? "bg-blue-50 text-blue-600 z-10 ring-1 ring-blue-600"
                    : "text-gray-900 hover:bg-gray-50",
                )}
                onClick={() => setViewVariant("compact")}
              >
                Compact
              </button>
              <button
                type="button"
                className={twMerge(
                  "relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold transition-colors",
                  viewVariant === "detailed"
                    ? "bg-blue-50 text-blue-600 z-10 ring-1 ring-blue-600"
                    : "text-gray-900 hover:bg-gray-50",
                )}
                onClick={() => setViewVariant("detailed")}
              >
                Detailed
              </button>
            </div>
          </div>
        </header>

        <section aria-live="polite">
          {loading && <UsersLoading />}

          {error && <UsersError error={error} />}

          {!loading && !error && filteredUsers.length === 0 && (
            <UsersEmpty
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
            />
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <div
              className={twMerge(
                "gap-4",
                viewVariant === "compact"
                  ? "flex flex-col"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                  variant={viewVariant}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </section>

        {selectedUserId && (
          <SelectedUserNotification
            userName={
              filteredUsers.find((u) => u.id === selectedUserId)?.name ||
              selectedUserId
            }
            onClose={() => setSelectedUserId(null)}
          />
        )}
      </div>
    </div>
  );
};
