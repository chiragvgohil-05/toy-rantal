import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Register from './pages/Register';
import MainLayout from './MainLayout';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./admin/AdminLayout";
import About from './pages/About';
import TermsAndCondtion from './pages/TermsAndCondtion';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Login/>} path='login'></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/toys" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<TermsAndCondtion />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
