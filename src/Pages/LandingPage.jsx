import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../Componets/Nav";
import "../index.css"

export const LandingPage = () => {
  const [setSearch, resetSearch] = useState("");
  const navigate = useNavigate();

  function animeData() {
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
              {
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 small"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
