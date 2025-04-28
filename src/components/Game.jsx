import { useState } from "react";
import PropTypes from "prop-types";
import GameBoard from "./GameBoard";
import LeaderBoard from "./LeaderBoard";
import "./Game.css";

function Game(props) {
  const { currentPlayers, players, setCurrentPlayers, setPlayers, setStatus } =
    props;
  const [turn, setTurn] = useState(0);

  const nextPlayer = () => {
    setTurn((turn) => (turn + 1) % currentPlayers.length);
  };

  const updatePlayerScore = (player, moves) => {
    const updatedPlayers = currentPlayers.map((p) =>
      p.username === player.username
        ? { ...p, gameHistory: [...p.gameHistory, moves] }
        : p
    );
    setCurrentPlayers(updatedPlayers);

    const updatedAllPlayers = players.map((p) =>
      p.username === player.username
        ? { ...p, gameHistory: [...p.gameHistory, moves] }
        : p
    );
    setPlayers(updatedAllPlayers);
    localStorage.setItem("players", JSON.stringify(updatedAllPlayers));
  };

  const removePlayer = (player) => {
    let update = currentPlayers.filter((p) => p.username !== player.username);
    setCurrentPlayers(update);

    let newTurnIndex = turn;
    if (newTurnIndex >= update.length) {
      newTurnIndex = 0;
    }
    setTurn(newTurnIndex);
  };

  return (
    <div>
      <button onClick={() => setStatus(true)} className="backButton">
        Back
      </button>
      <div className="gameBoardsContainer">
        {currentPlayers.map((player, index) => (
          <GameBoard
            key={player.username}
            player={player}
            isActive={index === turn}
            onMove={nextPlayer}
            onGameEnd={(moves) => updatePlayerScore(player, moves)}
            onLeave={() => removePlayer(player)}
          />
        ))}
      </div>
      <LeaderBoard players={players} />
    </div>
  );
}

Game.propTypes = {
  currentPlayers: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  setCurrentPlayers: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default Game;
