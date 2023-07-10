import React from "react";
import { Nav } from "../Componets/Nav";
import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css"
import "../universal.css";
import { Link, useParams } from "react-router-dom";
const API = `https://api.jikan.moe/v4/characters/`;

export const CharacterInfo = () => {
  function InfoPage() {
    const { id } = useParams();
    const [character, setCharacter] = useState({
      mal_id: "",
      url: "",
      images: { jpg: { large_image_url: "" } },
      name: "",
      name_kanji: "",
      nicknames: [],
      about: "",
      anime: [],
    });

    async function getAnime() {
      const { data } = await axios.get(`${API}${id}/full`);
      const getData = data.data;

      setCharacter(getData);
    }

    useEffect(() => {
      getAnime();
    }, []);

    return (
      <>
        <Nav />
        <section id="INFO">
          <div className="container">
            <div className="row">
              <Link to={`/characters/search/${character.name}`}>
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
              <div className="character-info-wrapperv2">
                <figure className="character-img-wrapperv2">
                  <img
                    className="character-img"
                    src={character.images?.jpg?.image_url}
                    alt="img-not-found"
                  />
                </figure>
                <div className="character-name-wrapper">
                  <h1 className="character-namev2">{character.name}</h1>
                  <h1 className="character-name-kanji">
                    {character.name_kanji}
                  </h1>
                  <h1 className="character-about">{character.about}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return <InfoPage />;
};
