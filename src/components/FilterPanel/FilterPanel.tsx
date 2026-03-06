import { useState, useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';
import { PRODUCT_CONSTANTS } from '../../constants/productConstants';
import SearchInput from '../../helpers/searchUtil';

const FilterPanel = () => {
  const { categories, brands, filterState, setFilterState } = useProductContext();
  const { filterPanel } = PRODUCT_CONSTANTS.productListing;
  const [minPrice, setMinPrice] = useState(filterState.minPrice);
  const [maxPrice, setMaxPrice] = useState(filterState.maxPrice);
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => {
    setMinPrice(filterState.minPrice);
    setMaxPrice(filterState.maxPrice);
  }, [filterState.minPrice, filterState.maxPrice]);

  const q = (filterSearch ?? '').toLowerCase().trim();
  const filteredCategories = q
    ? categories.filter(
        (c) =>
          (c?.name ?? '').toLowerCase().includes(q) || (c?.slug ?? '').toLowerCase().includes(q)
      )
    : categories;
  const filteredBrands = q ? brands.filter((b) => (b ?? '').toLowerCase().includes(q)) : brands;

  const handleCategoryChange = (category: string) => {
    setFilterState((prev) => ({ ...prev, category, brands: [], page: 1 }));
  };

  const handleApplyPrice = () => {
    setFilterState((prev) => ({ ...prev, minPrice, maxPrice, page: 1 }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilterState((prev) => {
      const next = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: next, page: 1 };
    });
  };

  return (
    <aside className="w-64 shrink-0 min-w-0 max-h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-5 overflow-y-auto overflow-x-hidden">
      <div className="mb-5">
        <SearchInput
          placeholder="Search..."
          size="sm"
          value={filterSearch}
          onChange={setFilterSearch}
        />
      </div>

      <fieldset className="mb-5 shrink-0">
        <legend className="mb-3 font-bold text-gray-900">{filterPanel.category}</legend>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-gray-900">
            <input
              type="radio"
              name="category"
              checked={!filterState.category}
              onChange={() => handleCategoryChange('')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>{filterPanel.all}</span>
          </label>
          {filteredCategories.map((c) => (
            <label key={c.slug} className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-gray-900">
              <input
                type="radio"
                name="category"
                checked={filterState.category === c.slug}
                onChange={() => handleCategoryChange(c.slug)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <section aria-labelledby="price-range-heading">
        <h3 id="price-range-heading" className="font-bold text-gray-900 mb-3">
          {filterPanel.priceRange}
        </h3>
        <div className="flex flex-col gap-2 mb-2">
          <input
            type="number"
            placeholder={filterPanel.minPlaceholder}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full min-w-0 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder={filterPanel.maxPlaceholder}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full min-w-0 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleApplyPrice}
          className="w-full py-2.5 mt-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filterPanel.apply}
        </button>
      </section>

      <fieldset className="mt-6 shrink-0">
        <legend className="mb-3 font-bold text-gray-900">{filterPanel.brand}</legend>
        <div className="space-y-2">
          {filteredBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-gray-900">
              <input
                type="checkbox"
                checked={filterState.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
};

export default FilterPanel;
