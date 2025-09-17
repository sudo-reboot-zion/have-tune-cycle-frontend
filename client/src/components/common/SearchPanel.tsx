'use client'

import React, { useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  onSearch,
  placeholder = "Search tracks, artists, tags...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Optional: Real-time search as user types (debounced)
    // You can implement debouncing here if needed
  };

  return (
    <div className={`w-full max-w-2xl text-primaryColor mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <LuSearch className="absolute left-4 h-5 w-5  pointer-events-none" />
          
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm md:text-base"
          />
          
          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <LuX className="h-4 w-4 text-primaryColor" />
            </button>
          )}
        </div>
        
        {/* Hidden submit button for form submission */}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
      
      {/* Optional: Search suggestions or recent searches can go here */}
    </div>
  );
};

export default SearchPanel;