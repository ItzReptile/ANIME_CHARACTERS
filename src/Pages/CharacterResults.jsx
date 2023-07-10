import React, { useEffect, useState } from "react";
import "../universal.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Nav } from "../Componets/Nav";
import "../index.css"

export const CharacterResults = () => {
  const API = `https://api.jikan.moe/v4/characters?q=`;
  const [characterId, setCharacterId] = useState([]);
  const { setSearch } = useParams();
  const [searchTerm, setSearchTerm] = useState(setSearch);
  const [reSearch, setreSearch] = useState(setSearch);
  const [displayCount, setDisplayCount] = useState(16);
  const [loading, setLoading] = useState(false);

  async function fetchCharacters(searchQuery) {
    setLoading(true);

    const { data } = await axios.get(`${API}${searchQuery}`);
    setCharacterId(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCharacters(reSearch);
  }, []);

  const reSearchCharacter = async () => {
    setLoading(true);
    await fetchCharacters(reSearch);
    setSearchTerm(reSearch);
    window.history.replaceState(null, "", `${reSearch}`);
    setLoading(false);
  };

  function OnKeyPress(key) {
    if (key === "Enter" && reSearch) {
      reSearchCharacter();
    }
  }

  function sortAnime(filter) {
    switch (filter) {
      case "NAME_A-Z":
        setCharacterId(
          [...characterId].sort((a, b) => (a.name > b.name ? 1 : -1))
        );
        break;
      case "NAME_Z-A":
        setCharacterId(
          [...characterId].sort((a, b) => (b.name > a.name ? 1 : -1))
        );
        break;

      default:
        break;
    }
  }

  const loadMoreCharacters = () => {
    setDisplayCount((prevCount) => prevCount + 16);
  };

  return (
    <>
      <Nav />
      <section id="RESULTS">
        <div className="container">
          <div className="row">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 small"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            </Link>

            <div className="search-results-wrapper">
              <input
                type="text"
                className="search-barv2"
                placeholder="search character again"
                value={reSearch}
                onChange={(event) => setreSearch(event.target.value)}
                onKeyDown={(event) => OnKeyPress(event.key)}
              />
              <button
                className="search-btnv2"
                disabled={!reSearch}
                onClick={() => reSearchCharacter()}
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
            <div className="search-functions-wrapper">
              <h1 className="search-results-text">
                You searched for <span className="black">{searchTerm}</span>
              </h1>
              <select
                className="selective"
                id="filter"
                onChange={(e) => sortAnime(e.target.value)}
                defaultValue={"select"}
              >
                <option disabled value="select">
                  Sort
                </option>
                <option value="NAME_A-Z">Name A-Z</option>
                <option value="NAME_Z-A">Name Z-A</option>
              </select>
            </div>

            <div className="character-displays">
              {loading ? (
                new Array(displayCount)
                  .fill(0)
                  .map((__, index) => (
                    <div key={index} className="loading-state"></div>
                  ))
              ) : characterId.length === 0 ? (
                <div className="no-results">No results found.</div>
              ) : (
                characterId.slice(0, displayCount).map((character) => (
                  <div
                    className="character-info-wrapper"
                    key={character.mal_id}
                  >
                    <figure className="character-img-wrapper ">
                      <img
                        className="character-img"
                        src={character.images.jpg.image_url}
                        alt="img-not-found"
                      />
                    </figure>
                    <div>
                      <h1 className="character-name">{character.name}</h1>
                      <Link to={`/characters/${character.mal_id}`}>
                        <button className="learn-more">Learn More</button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="btn-wrapper">
              {characterId.length > displayCount && (
                <button className="load-more" onClick={loadMoreCharacters}>
                  load more
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
