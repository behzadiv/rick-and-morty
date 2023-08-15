import { useState } from "react";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState(allCharacters);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => {
        return setCharacters([]);
      });
  }, []);

  return (
    <div className="app">
      <Navbar numOfCharacters={characters.length} />
      <div className="main">
        <CharacterList allCharacters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
