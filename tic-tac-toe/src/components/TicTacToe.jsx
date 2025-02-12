import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));  // Board state to track the game state
  const [xIsNext, setXIsNext] = useState(true);  // Track whose turn it is

  // Handle clicking a square on the board
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; // Ignore if cell is filled or game is over
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);  // Switch player
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
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `${winner} wins!` : `Next player: ${xIsNext ? "X" : "O"}`;

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
      {winner && <button onClick={() => setBoard(Array(9).fill(null))}>Start New Game</button>}
    </div>
  );
};

export default TicTacToe;

