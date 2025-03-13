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
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import CreateCategory from './component/admin/CreateCategory';
import UpdateCategory from './component/admin/UpdateCategory';

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
            <Route path='/login' element={<LoginPage/> } />
            
            {/* Routes for logged in users */}
            <Route path='/profile' element={<ProtectedRoute element={ProfilePage} /> } />
            <Route path='/add-address' element={<ProtectedRoute element={AddressPage} /> } />
            <Route path='/edit-address' element={<ProtectedRoute element={AddressPage} /> } />

            {/* Routes for Admin */}
            <Route path='/admin' element={<AdminRoute element={AdminPage} />} />
            <Route path='/admin/categories' element={<AdminRoute element={AdminCategoryPage} />} />
            <Route path='/admin/create-category' element={<AdminRoute element={CreateCategory} />} />
            <Route path='/admin/update-category/:categoryId' element={<AdminRoute element={UpdateCategory} />} />

          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
