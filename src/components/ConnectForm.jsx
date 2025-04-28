import { useState } from "react";
import PropTypes from "prop-types";
import "./ConnectForm.css";

function ConnectForm(props) {
  const { players, setPlayers, currentPlayers, setCurrentPlayers, setStatus } =
    props;
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isNewPlayer, setIsNewPlayer] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPlayer = players.find(
      (p) => p.username === formData.username
    );
    if (isNewPlayer) {
      if (existingPlayer) {
        showError("Username already exists");
        // alert("This player already exists in the system");
      } else {
        createNewPlayer(formData);
      }
    } else {
      if (existingPlayer) {
        setCurrentPlayers([
          ...currentPlayers,
          {
            ...existingPlayer,
            moves: 0,
            currentNumber: Math.floor(Math.random() * 99),
          },
        ]);
      } else {
        showError("Player does not exist in the system");
        // alert("Player does not exist in the system");
      }
    }
    setFormData({ username: "", password: "" });
  };

  const createNewPlayer = (playerData) => {
    const newPlayer = {
      ...playerData,
      currentNumber: Math.floor(Math.random() * 99),
      moves: 0,
      gameHistory: [],
    };

    setPlayers([newPlayer, ...players]);
    localStorage.setItem("players", JSON.stringify([newPlayer, ...players]));
    setCurrentPlayers([newPlayer, ...currentPlayers]);
  };

  return (
    <div className="loginFormContainer">
      <div className="formTypeToggle">
        <button
          className={isNewPlayer ? "active" : ""}
          onClick={() => setIsNewPlayer(true)}
        >
          Sign Up
        </button>
        <button
          className={!isNewPlayer ? "active" : ""}
          onClick={() => setIsNewPlayer(false)}
        >
          Log In
        </button>
      </div>

      <form onSubmit={handleSubmit} className="loginForm">
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">{isNewPlayer ? "Sign Up" : " Log In"}</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {currentPlayers.length > 0 && (
          <button
            type="button"
            className="startGameButton"
            onClick={() => setStatus(false)}
          >
            Start Game
          </button>
        )}
      </form>
      <ul>
        {currentPlayers.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
}

ConnectForm.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  currentPlayers: PropTypes.array.isRequired,
  setCurrentPlayers: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default ConnectForm;
