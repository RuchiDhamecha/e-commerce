import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import Footer from '../../layout/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PAGE_SIZE } from './ProductListing.service';
import { PRODUCT_CONSTANTS } from '../../constants/productConstants';

const ProductListing = () => {
  const {
    products,
    total,
    filterState,
    setFilterState,
    loading,
    error,
    retry,
  } = useProductContext();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <section className="flex min-h-0 flex-1 overflow-hidden bg-gray-50" aria-labelledby="product-listing-heading">
      <FilterPanel />
      <section className="flex-1 flex flex-col min-w-0 overflow-auto">
        <section className="p-6 flex-1" aria-labelledby="product-listing-heading">
          <h2 id="product-listing-heading" className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Filters
          </h2>
          {products.length === 0 ? (
            <section className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-white p-8" role="status" aria-live="polite">
              <p className="text-center text-gray-600">
                {PRODUCT_CONSTANTS.productListing.noProductsFound}
              </p>
            </section>
          ) : (
            <>
              <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" aria-label="Products">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </section>
              <Footer
                page={filterState.page}
                total={total}
                limit={PAGE_SIZE}
                onPageChange={(page) => setFilterState((prev) => ({ ...prev, page }))}
              />
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default ProductListing;
