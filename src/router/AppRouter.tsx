import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Layout from '../layout/Layout/Layout';

const ProductListing = lazy(() =>
  import('../pages/ProductListing/ProductListing')
);
const ProductDetail = lazy(() =>
  import('../pages/ProductDetail/ProductDetail')
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
