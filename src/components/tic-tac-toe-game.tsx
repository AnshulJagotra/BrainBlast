"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Circle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

type Player = 'X' | 'O';
type Square = Player | null;

const calculateWinner = (squares: Square[]): Player | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export function TicTacToeGame() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i: number) => {
    if (winner || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  
  const renderSquare = (i: number) => {
    return (
      <button
        className="w-24 h-24 md:w-32 md:h-32 bg-card border-2 border-border flex items-center justify-center rounded-lg transition-colors hover:bg-muted"
        onClick={() => handleClick(i)}
      >
        {board[i] === 'X' && <X className="w-16 h-16 md:w-20 md:h-20 text-red-500" />}
        {board[i] === 'O' && <Circle className="w-16 h-16 md:w-20 md:h-20 text-blue-500" />}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return <h2 className="text-2xl font-bold text-primary flex items-center gap-2"><Award/> Winner: {winner}</h2>;
    }
    if (isDraw) {
      return <h2 className="text-2xl font-bold text-muted-foreground">It's a Draw!</h2>;
    }
    return <h2 className="text-2xl font-bold">Next player: {xIsNext ? 'X' : 'O'}</h2>;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        {getStatus()}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}
