"use client";

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
    onSearch: (input: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input);
    };

    return (
    <div className="flex items-center gap-3 rounded-full bg-slate-900/70 border border-slate-700/70 px-4 py-2 shadow-lg shadow-sky-900/40 backdrop-blur">
      <FaMagnifyingGlass className="text-slate-300" />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search locations…"
        className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="px-4 py-1.5 text-xs font-medium rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors"
      >
        Search
      </button>
    </div>
    );
}