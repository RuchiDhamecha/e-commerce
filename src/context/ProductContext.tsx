import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import {
  getProducts,
  getProductsByCategory,
  getCategories,
} from '../services/productService';
import { PRODUCT_CONSTANTS } from '../constants/productConstants';
import { getUniqueBrands, matchesProductSearch } from '../helpers/utils';
import type { Product, Category } from '../types/product.types';
import type { FilterState } from '../types/filter.types';

const PAGE_SIZE = 12;

const defaultFilters: FilterState = {
  category: '',
  minPrice: '',
  maxPrice: '',
  brands: [],
  productSearch: '',
  page: 1,
};

interface ProductContextValue {
  products: Product[];
  total: number;
  categories: Category[];
  brands: string[];
  filterState: FilterState;
  setFilterState: (fn: (prev: FilterState) => FilterState) => void;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [filterState, setFilterState] = useState<FilterState>(defaultFilters);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const brands = useMemo(
    () => getUniqueBrands(products),
    [products]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        filterState.category
          ? getProductsByCategory(filterState.category)
          : getProducts(200, 0),
        getCategories(),
      ]);
      const productList = productsRes?.products;
      setProducts(Array.isArray(productList) ? productList : []);
      const catList = categoriesRes;
      setCategories(
        Array.isArray(catList)
          ? catList.map((c) => (typeof c === 'string' ? { slug: c, name: c } : { slug: c?.slug ?? '', name: c?.name ?? '' }))
          : []
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : PRODUCT_CONSTANTS.productDetail.failedToFetch);
    } finally {
      setLoading(false);
    }
  }, [filterState.category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    const min = filterState.minPrice ? Number(filterState.minPrice) : null;
    const max = filterState.maxPrice ? Number(filterState.maxPrice) : null;
    if (min != null && !Number.isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
    if (max != null && !Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }
    if (filterState.brands?.length) {
      result = result.filter((p) => filterState.brands.includes(p.brand ?? ''));
    }
    const search = filterState.productSearch ?? '';
    if (search.trim()) {
      result = result.filter((p) => matchesProductSearch(p, search));
    }
    return result;
  }, [products, filterState.minPrice, filterState.maxPrice, filterState.brands, filterState.productSearch]);

  const total = filteredProducts.length;
  const start = (filterState.page - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(start, start + PAGE_SIZE);

  const value: ProductContextValue = {
    products: paginatedProducts,
    total,
    categories,
    brands,
    filterState,
    setFilterState,
    loading,
    error,
    retry: fetchData,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProductContext must be used within ProductProvider');
  return ctx;
}
