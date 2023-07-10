import React, { useState } from "react";

import "../index.css"

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  return (
    <section id="NAV">
      <div className="container">
        <div className="row">
          <nav>
            <div className="site-title">
              <a href="/">
              <h2 className="black">AnimeCharacters</h2>
              </a>
            </div>
            <div className="site-links-wrapper">
              <ul className="site-links">
                <a className="site-link" href="/">
                  Home
                </a>
                <li
                  onClick={() => alert("Ive Suffered Enough")}
                  className="no site-link"
                >
                  Contact
                </li>
                <li
                  onClick={() => alert("Ive Suffered Enough")}
                  className="no site-link"
                >
                  About
                </li>
              </ul>
            </div>
            <svg
              onClick={toggleMenu}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 small hamburger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className={`menu-display ${menuOpen ? "menu--open" : ""}`}>
              <ul className="menu-links">
                <li className="menu-link">About</li>
                <li className="menu-link">Contact</li>
                <li className="menu-link red" onClick={toggleMenu}>
                  Close
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};
