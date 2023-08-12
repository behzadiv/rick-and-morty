import Navbar from "./components/Navbar";
import "./App.css";
import CharacterList from "./components/CharacterList";

export default function App() {
  return(
    <div className="app">

      <Navbar/>
      <div className="main">
        <CharacterList/>
        <div className="character-detail"></div>
      </div>
    </div>
    
  );
}
