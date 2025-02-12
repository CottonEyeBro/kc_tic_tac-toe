import React, { useState } from "react";
import Card from "./ui/Card";  // adjust import path if needed
import CardContent from "./ui/CardContent";  // adjust import path if needed
import Button from "./ui/Button";  // adjust import path if needed

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || gameOver) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner || newBoard.every((cell) => cell)) {
      setHistory([...history, { board: newBoard, winner: winner || "Draw" }]);
      setGameOver(true);
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

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className="grid grid-cols-3 gap-2"
        style={{ maxWidth: "180px", width: "100%" }} // Ensuring it's properly constrained and responsive
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 flex items-center justify-center border-2 border-gray-300 text-2xl cursor-pointer"
            style={{
              backgroundColor: cell ? (cell === "X" ? "#f0f8ff" : "#f8f0ff") : "#fff",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <p className="mt-4 text-lg">Next player: {xIsNext ? "X" : "O"}</p>
      <h2 className="mt-6 text-xl font-bold">Game History</h2>
      {history.map((game, index) => (
        <Card key={index} className="mt-2 w-64 p-2">
          <CardContent>
            <p>Game {index + 1}: {game.winner} won</p>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {game.board.map((cell, i) => (
                <div key={i} className="w-6 h-6 flex items-center justify-center border-2 border-gray-300 text-sm">
                  {cell}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={clearHistory} className="mt-4">Clear History</Button>
    </div>
  );
};

export default TicTacToe;
