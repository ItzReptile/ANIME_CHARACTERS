import React, { useEffect, useState } from "react";
import "../universal.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./CharacterResults.css";
import {ArrowLeftIcon,MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import { Nav } from "../Componets/Nav";

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
              <ArrowLeftIcon className="small arrow-left" />
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
                <MagnifyingGlassIcon className="small" />
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
