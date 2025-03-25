"use client";

import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const SearchBar: FC<Props> = ({ value, setValue }) => {
  return (
    <div className="relative w-full max-w-md mb-8">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
    </div>
  );
};
