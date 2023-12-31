import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MainPage from './pages/MainPage';
import ProductsList from './pages/Products/ProductsListPage';
import ProductsDetailPage from './pages/Products/ProductsDetailPage';
import Gnb from './components/gnb';
import CartPage from './pages/cart/CartPage'
import PaymentPage from './pages/payment/PaymentPage';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        <Gnb/>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/products" element={<ProductsList/>}/>
            <Route path="/products/:id" element={<ProductsDetailPage/>}/>
            <Route path="/payment" element={<PaymentPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
