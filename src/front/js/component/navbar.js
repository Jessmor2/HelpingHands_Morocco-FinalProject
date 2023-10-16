import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImageUrl from "../../img/logo.png";

export const Navbar = () => {


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Define breakpoint for larger screens (768px)
      const breakpoint = 768;
      if (screenWidth >= breakpoint) {
        closeMobileMenu();
      }
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const storage = localStorage.getItem('user_id');

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            className="logo"
            src={logoImageUrl}
            style={{ width: "220px", height: "220px" }}
            alt="Logo"
          />
        </Link>
        <div className={`navLinks ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/aboutUs">About Us</Link>
          {storage > 0 ? (
            <Link
              to="/login"
              className="button-link login-button"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" className="button-link login-button">
              Login
            </Link>
          )}
          <Link to="/signup" className="button-link signup-button">
            Sign Up
          </Link>
        </div>
        <div
          className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};
