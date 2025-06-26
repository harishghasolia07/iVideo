import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search videos..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
    );
}