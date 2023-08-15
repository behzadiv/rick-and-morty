import { useState } from "react";
import Navbar, { Search } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  useEffect(() => {
    axios
      .get(
        !debouncedInputValue
          ? "https://rickandmortyapi.com/api/character"
          : `https://rickandmortyapi.com/api/character/?name=${debouncedInputValue}`
      )
      .then(({ data }) => setCharacters(data.results.slice(0, 5)))
      .catch((err) => {
        console.log(err.response.data);
        return setCharacters([]);
      });
  }, [debouncedInputValue]);

  useEffect(() => {
    const debouncedInputValueId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(debouncedInputValueId);
  }, [inputValue, 500]);

  return (
    <div className="app">
      <Navbar numOfCharacters={characters.length}>
        <Search query={inputValue} setQuery={setInputValue} />
      </Navbar>
      <div className="main">
        <CharacterList allCharacters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
