import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Toys from "./pages/Toys";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="toys" element={<Toys />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;