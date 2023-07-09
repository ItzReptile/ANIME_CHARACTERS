import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Componets/Nav";
import "../universal.css";
import "./LandingPage.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const LandingPage = () => {
  const [setSearch, resetSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function animeData() {
    setLoading(true);
    setTimeout(() => {
      navigate(`/characters/search/${setSearch}`);
    }, 700);
  }

  function OnKeyPress(key) {
    if (key === "Enter" && setSearch) {
      animeData();
    }
  }

  return (
    <>
      <Nav />
      <section id="LANDING">
        <div className="background-blur">
          <div className="container">
            <div className="row">
              <div className="headers">
                <h1 className="header-title">
                  Welcome To AnimeCharacters,Where You Can Search You're Desired
                  Character!
                </h1>
                <h4 className="subheader-title">
                  Go Ahead And Search Any Anime Character
                </h4>
              </div>
              <div className="searchbar-wrapper">
                <input
                  className="search-bar"
                  type="textarea"
                  placeholder="Search: Ex Luffy"
                  onChange={(e) => resetSearch(e.target.value)}
                  onKeyDown={(event) => OnKeyPress(event.key)}
                  value={setSearch}
                />
                <button
                  className="search-btn"
                  onClick={() => animeData()}
                  disabled={!setSearch}
                >
                  <MagnifyingGlassIcon className="small" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
