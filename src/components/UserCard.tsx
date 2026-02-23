import React from "react";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  company: string;
  variant: "compact" | "detailed";
  onSelect?: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  company,
  variant,
  onSelect,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(id);
    }
  };

  const isClickable = !!onSelect;
  const containerClasses = twMerge(
    "rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    isClickable
      ? "cursor-pointer hover:shadow-md hover:border-blue-300"
      : "cursor-default border-gray-200",
    variant === "compact"
      ? "p-4 sm:p-5 flex items-center justify-between gap-4 bg-white"
      : "p-6 flex flex-col items-center text-center gap-4 bg-white shadow-sm hover:shadow-md",
  );

  if (variant === "compact") {
    return (
      <article
        className={containerClasses}
        onClick={() => onSelect?.(id)}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        tabIndex={isClickable ? 0 : undefined}
        role={isClickable ? "button" : "article"}
        aria-label={`User ${name}`}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex flex-col items-start">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
        </div>
        <div className="shrink-0 hidden sm:block">
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {company}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={containerClasses}
      onClick={() => onSelect?.(id)}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : "article"}
      aria-label={`User ${name}`}
    >
      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl mb-2">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm font-medium text-blue-600 mt-1">{company}</p>
      </div>

      <div className="w-full mt-4 pt-4 border-t border-gray-100">
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start text-left">
            <dt className="text-gray-500 font-medium">Email</dt>
            <dd className="text-gray-900 sm:col-span-2 sm:text-right">
              {email}
            </dd>
          </div>
          <div className="flex justify-between items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start text-left">
            <dt className="text-gray-500 font-medium">ID</dt>
            <dd className="text-gray-500 font-mono text-xs sm:col-span-2 sm:text-right">
              {id}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
};
