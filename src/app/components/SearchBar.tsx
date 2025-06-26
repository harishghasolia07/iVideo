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
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search videos..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-black "
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
}