import React from 'react';

interface TanStackIconProps {
  className?: string;
}

export const TanStackIcon: React.FC<TanStackIconProps> = ({ className = 'inline h-4 w-4' }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <title>TanStack Logo</title>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l8 4v8.64l-8 4-8-4V8.18l8-4z" />
      <path d="M12 6.09L6.09 9v6L12 17.91 17.91 15V9L12 6.09zm0 2.18l4.73 2.36v4.54L12 15.64l-4.73-2.47v-4.54L12 8.27z" />
    </svg>
  );
};
