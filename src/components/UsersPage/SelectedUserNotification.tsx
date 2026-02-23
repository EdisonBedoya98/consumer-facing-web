import React from "react";

interface SelectedUserNotificationProps {
  userName: string;
  onClose: () => void;
}

export const SelectedUserNotification: React.FC<
  SelectedUserNotificationProps
> = ({ userName, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl px-5 py-4 flex items-center justify-between gap-6 ring-1 ring-white/10">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Selected Action
          </span>
          <span className="text-sm font-medium truncate max-w-xs">
            {userName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
