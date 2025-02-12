import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    
    if (calculateWinner(newBoard) || newBoard.every((cell) => cell)) {
      setHistory([...history, { board: newBoard, winner: calculateWinner(newBoard) || "Draw" }]);
      setTimeout(() => setBoard(Array(9).fill(null)), 1000);
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h1>
  
      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 border border-gray-500 p-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 border border-gray-500 flex items-center justify-center text-3xl font-bold"
          >
            {cell}
          </button>
        ))}
      </div>
  
      <p className="mt-4 text-lg font-semibold">Next player: {xIsNext ? "X" : "O"}</p>
  
      {/* Game History */}
      <h2 className="mt-6 text-xl font-bold">Game History</h2>
      {history.map((game, index) => (
        <div key={index} className="border p-4 rounded-md mt-2 w-64">
          <p>Game {index + 1}: {game.winner} won</p>
          <div className="grid grid-cols-3 gap-1 mt-2">
            {game.board.map((cell, i) => (
              <div key={i} className="w-6 h-6 flex items-center justify-center border border-gray-300 text-sm">
                {cell}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );  
};

export default TicTacToe;

