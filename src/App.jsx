import { useState } from "react";
import ConnectForm from "./components/ConnectForm";
import Game from "./components/Game";
import "./App.css";

function App() {
  const [players, setPlayers] = useState(() =>
    JSON.parse(localStorage.getItem("players") || "[]")
  );
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [status, setStatus] = useState(true);

  return (
    <div className="gameContainer">
      {status ? (
        <ConnectForm
          players={players}
          setPlayers={setPlayers}
          currentPlayers={currentPlayers}
          setCurrentPlayers={setCurrentPlayers}
          setStatus={setStatus}
        />
      ) : (
        <Game
          currentPlayers={currentPlayers}
          players={players}
          setCurrentPlayers={setCurrentPlayers}
          setPlayers={setPlayers}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}

export default App;
