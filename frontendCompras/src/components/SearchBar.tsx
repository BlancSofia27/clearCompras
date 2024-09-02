// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [title, setTitle] = useState<string>('');

  const handleSearch = () => {
    setSearchTerm(title);
  };

  return (
    <div className="flex h-8 w-10 m-5">
      <input
      className='bg-slate-300 mx-4 rounded-md p-3'
        type="text"
        placeholder="Buscar por título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
      className="bg-slate-200 rounded-sm p-2 text-center flex justify-center items-center"
       onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
