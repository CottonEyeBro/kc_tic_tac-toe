import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Track current board
  const [xIsNext, setXIsNext] = useState(true); // Track current player's turn
  const [history, setHistory] = useState([]); // Store past game results

  // Handle clicking a square on the board
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; // Ignore if cell is filled or game is over
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext); // Switch player

    // Check if it's a draw after every move
    if (!calculateWinner(newBoard) && newBoard.every(cell => cell !== null)) {
      setHistory([...history, { board: newBoard, winner: "Draw" }]); // Record the draw result
      setBoard(Array(9).fill(null)); // Reset board for a new game
    }
  };

  // Calculate winner
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
      [0, 4, 8], [2, 4, 6],  // Diagonal
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return winner ("X" or "O")
      }
    }
    return null;
  };

  // Game status: Display winner or whose turn it is
  const winner = calculateWinner(board);
  const status = winner ? `${winner} wins!` : `Next player: ${xIsNext ? "X" : "O"}`;

  // Handle new game after one ends
  const handleNewGame = () => {
    setHistory([...history, { board, winner: winner || "Draw" }]); // Store the current game result
    setBoard(Array(9).fill(null)); // Reset the board
  };

  return (
    <div className="game">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <p>{status}</p>
      {winner && <button onClick={handleNewGame}>Start New Game</button>}

      {/* Display Past Games */}
      <div className="history">
        <h2>Past Games</h2>
        {history.map((game, index) => (
          <div key={index} className="game-result">
            <h3>Game {index + 1}: {game.winner === "Draw" ? "Draw" : `${game.winner} won`}</h3>
            <div className="board">
              {game.board.map((cell, i) => (
                <div key={i} className="cell">
                  {cell}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
