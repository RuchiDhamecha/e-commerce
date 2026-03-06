interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'pl-9 pr-3 py-2 text-sm max-w-[200px]',
  md: 'pl-10 pr-4 py-2.5 text-sm max-w-[520px]',
};

const SearchInput = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  className = '',
  size = 'md',
}: SearchInputProps) => {
  const sizeClass = sizeClasses[size];
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full ${sizeClass} bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
    </div>
  );
};

export default SearchInput;
