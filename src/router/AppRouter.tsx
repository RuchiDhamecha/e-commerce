import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Layout from '../layout/Layout/Layout';
import { SidebarProvider } from '../context/SidebarContext';

const ProductListing = lazy(() =>
  import('../pages/ProductListing/ProductListing')
);
const ProductDetail = lazy(() =>
  import('../pages/ProductDetail/ProductDetail')
);

const AppRouter = () => {
  return (
    <SidebarProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
        </Routes>
      </Suspense>
    </SidebarProvider>
  );
};

export default AppRouter;
