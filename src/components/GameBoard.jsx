import { useState } from "react";
import PropTypes from "prop-types";
import "./GameBoard.css";

function GameBoard(props) {
  const { player, isActive, onMove, onGameEnd, onLeave } = props;
  const [currentNumber, setCurrentNumber] = useState(player.currentNumber);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const operations = {
    add: (num) => num + 1,
    sub: (num) => num - 1,
    mult: (num) => num * 2,
    div: (num) => Math.floor(num / 2),
  };

  const makeMove = (operation) => {
    if (!isActive || gameWon) return;

    const newNumber = operations[operation](currentNumber);
    setCurrentNumber(newNumber);
    setMoves((prev) => prev + 1);

    if (newNumber === 100) {
      setGameWon(true);
      onGameEnd(moves + 1);
    } else {
      onMove();
    }
  };

  const startNewGame = () => {
    setCurrentNumber(Math.floor(Math.random() * 100));
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className={`gameBoard ${isActive ? "activeBoard" : ""}`}>
      <h3>{player.username}</h3>
      <div className="currentNumber">{currentNumber}</div>

      {!gameWon ? (
        <div className="controls">
          <button onClick={() => makeMove("add")} disabled={!isActive}>
            +1
          </button>
          <button onClick={() => makeMove("sub")} disabled={!isActive}>
            -1
          </button>
          <button onClick={() => makeMove("mult")} disabled={!isActive}>
            ×2
          </button>
          <button onClick={() => makeMove("div")} disabled={!isActive}>
            ÷2
          </button>
        </div>
      ) : (
        <div className="gameEndControls">
          <button onClick={startNewGame}>New Game</button>
          <button onClick={onLeave}>Leave</button>
        </div>
      )}
      <div className="moveCounter">Moves: {moves}</div>
      <div className="playerHistory">
        Previous Games: {player.gameHistory.join(", ")}
      </div>
    </div>
  );
}

GameBoard.propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string.isRequired,
    currentNumber: PropTypes.number.isRequired,
    gameHistory: PropTypes.array.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  onGameEnd: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default GameBoard;
