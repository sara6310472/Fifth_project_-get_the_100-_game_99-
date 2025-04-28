import PropTypes from "prop-types";
import "./LeaderBoard.css";

const LeaderBoard = ({ players }) => {
  const calculatePlayerAverage = (player) => {
    const { gameHistory } = player;
    return gameHistory.length === 0
      ? Infinity
      : gameHistory.reduce((sum, score) => sum + score, 0) / gameHistory.length;
  };

  const topPlayers = [...players]
    .filter((player) => player.gameHistory.length > 0)
    .sort((a, b) => calculatePlayerAverage(a) - calculatePlayerAverage(b))
    .slice(0, 3);

  return (
    <div className="leaderBoard">
      <h2>Leaderboard</h2>
      {topPlayers.map((player, index) => (
        <div key={index} className="leaderBoardItem">
          {player.username} - Average:
          {calculatePlayerAverage(player).toFixed(2)} moves
        </div>
      ))}
    </div>
  );
};

LeaderBoard.propTypes = {
  players: PropTypes.array.isRequired,
};

export default LeaderBoard;
