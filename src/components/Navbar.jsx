import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import '../styles/Navbar.css';
import Logo from '../assets/svg/Logo.svg'; // Assuming you have a logo image

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
    setSearchQuery('');
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <NavLink to="/">
              <img src={Logo} alt="ShopEasy" />
            </NavLink>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end className="nav-item" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/toys" className="nav-item" onClick={closeMenu}>Toys</NavLink></li>
          <li><NavLink to="/about" className="nav-item" onClick={closeMenu}>About US</NavLink></li>
          <li><NavLink to="/contact" className="nav-item" onClick={closeMenu}>Contact US</NavLink></li>
          <li><NavLink to="/terms" className="nav-item" onClick={closeMenu}>Terms & Conditions</NavLink></li>

          {/* Mobile-only items */}
          {isMobile && (
            <>
          
              <li className="mobile-only-icons">
                <NavLink to="/login" className="icon-link" onClick={closeMenu}>
                  <FaSearch className="icon" title="Search" />
                </NavLink>
                <NavLink to="/login" className="icon-link" onClick={closeMenu}>
                  <FaUser className="icon" title="Register" />
                </NavLink>
                <NavLink to="/cart" className="icon-link" onClick={closeMenu}>
                  <FaShoppingCart className="icon" title="Cart" />
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Desktop-only items */}
        {!isMobile && (
          <div className="navbar-right">
        
             <NavLink to="/login" className="icon-link" onClick={closeMenu}>
                  <FaSearch className="icon" title="Search" />
                </NavLink>
            <NavLink to="/login" className="icon-link">
              <FaUser className="icon" title="Register" />
            </NavLink>
            <NavLink to="/cart" className="icon-link">
              <FaShoppingCart className="icon" title="Cart" />
              <span className="cart-count">0</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Mobile search bar when not in menu */}
      {isMobile && !menuOpen && (
        <div className="mobile-search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;