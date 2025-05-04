// Search.tsx
import React from 'react';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

export default Search;
