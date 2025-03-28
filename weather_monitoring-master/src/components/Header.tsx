import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex-1 max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button
        onClick={toggleDarkMode}
        className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
      </button>
    </div>
  );
}