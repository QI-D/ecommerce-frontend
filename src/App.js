import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/cartContext';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductPage from './component/pages/CategoryProductPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
          <Routes>
            <Route exact path='/' element={<Home/> } />
            <Route path='/product/:productId' element={<ProductDetailsPage/> } />
            <Route path='/categories' element={<CategoryListPage/> } />
            <Route path='/category/:categoryId' element={<CategoryProductPage/> } />
            <Route path='/cart' element={<CartPage/> } />
            <Route path='/register' element={<RegisterPage/> } />
          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
