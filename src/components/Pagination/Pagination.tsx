import { PRODUCT_CONSTANTS } from '../../constants/productConstants';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, total, limit, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit) || 1;
  const { previous, next } = PRODUCT_CONSTANTS.pagination;
  let start = 1;
  if (totalPages > 5 && page > 3) start = Math.min(page - 2, totalPages - 4);
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← {previous}
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-lg font-medium ${
            p === page
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {next} →
      </button>
    </nav>
  );
};

export default Pagination;
