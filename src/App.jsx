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
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(
        !name
          ? "https://rickandmortyapi.com/api/character"
          : `https://rickandmortyapi.com/api/character/?name=${name}`
      )
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => {
        console.log(err.response.data);
        return setCharacters([]);
      });
  }, [name]);

  const searchHandler = (value) => {
    setName(value);
  };

  return (
    <div className="app">
      <Navbar
        numOfCharacters={characters.length}
        onSearchHandler={searchHandler}
      />
      <div className="main">
        <CharacterList allCharacters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
