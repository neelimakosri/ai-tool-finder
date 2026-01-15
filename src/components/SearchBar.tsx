import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for AI tools... (e.g., image generator, coding assistant, writing)"
          className="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <button
          onClick={onSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors duration-200 font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}
