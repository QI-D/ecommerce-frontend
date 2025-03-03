import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/cartContext';
import Home from './component/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
          <Routes>
            <Route exact path='/' element={<Home/> } />
          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
