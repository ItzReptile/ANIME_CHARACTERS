import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import "./Nav.css";

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
              <h2>AnimeCharacters</h2>
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
            <UserIcon onClick={toggleMenu} className="small hamburger" />
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
