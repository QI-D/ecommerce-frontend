import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/cartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Footer />
        <Routes>
          
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
