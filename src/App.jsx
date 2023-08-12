import { useState } from "react";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState(allCharacters);
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
