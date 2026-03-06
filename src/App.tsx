import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
