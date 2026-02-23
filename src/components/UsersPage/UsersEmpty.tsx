import React from "react";

interface UsersEmptyProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export const UsersEmpty: React.FC<UsersEmptyProps> = ({
  searchQuery,
  onClearSearch,
}) => {
  return (
    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">
        No users found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        We couldn't track down any users matching "{searchQuery}".
      </p>
      <button
        onClick={onClearSearch}
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Clear Search
      </button>
    </div>
  );
};
