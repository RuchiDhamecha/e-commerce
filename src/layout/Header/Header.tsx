import { useLocation } from 'react-router-dom';
import SearchInput from '../../helpers/searchUtil';
import { useSidebar } from '../../context/SidebarContext';
import { useProductContext } from '../../context/ProductContext';

const Header = () => {
  const { pathname } = useLocation();
  const { toggleSidebar } = useSidebar();
  const { filterState, setFilterState } = useProductContext();
  const isDetailPage = /^\/product\/\d+$/.test(pathname);

  return (
    <header className="bg-slate-700 px-4 py-3 flex items-center gap-4 shrink-0">
      {/* on details page, dont need search bar and menu bar */}
      {!isDetailPage && (
        <>
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 text-white hover:bg-slate-600 rounded-lg shrink-0"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center min-w-0">
            <SearchInput
              placeholder="Search products..."
              size="md"
              className="w-full max-w-[520px]"
              value={filterState.productSearch}
              onChange={(v) => setFilterState((prev) => ({ ...prev, productSearch: v, page: 1 }))}
            />
          </div>
        </>
      )}
      {isDetailPage && <div className="flex-1" />}
      <nav
        aria-label="Header actions"
        className="flex items-center gap-2 shrink-0"
      >
        <button type="button" className="p-2 text-white hover:bg-slate-600 rounded-lg" aria-label="Cart">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button type="button" className="p-2 text-white hover:bg-slate-600 rounded-lg" aria-label="Profile">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
