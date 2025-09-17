"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROWS = 6;
const COLS = 7;

type Player = '1' | '2';
type Cell = Player | null;
type Board = Cell[][];

const createEmptyBoard = (): Board => Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

const checkForWin = (board: Board): Player | null => {
  // Check horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] && board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) {
        return board[r][c];
      }
    }
  }

  // Check vertical
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] && board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c] && board[r][c] === board[r + 3][c]) {
        return board[r][c];
      }
    }
  }

  // Check diagonal (down-right)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] && board[r][c] === board[r + 1][c + 1] && board[r][c] === board[r + 2][c + 2] && board[r][c] === board[r + 3][c + 3]) {
        return board[r][c];
      }
    }
  }

  // Check diagonal (up-right)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[r][c] && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
        return board[r][c];
      }
    }
  }

  return null;
};

const isBoardFull = (board: Board): boolean => {
    return board.every(row => row.every(cell => cell !== null));
}


export function ConnectFourGame() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('1');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleColumnClick = (colIndex: number) => {
    if (winner || board[0][colIndex]) return;

    const newBoard = board.map(row => [...row]);
    let rowPlaced = -1;

    for (let i = ROWS - 1; i >= 0; i--) {
      if (!newBoard[i][colIndex]) {
        newBoard[i][colIndex] = currentPlayer;
        rowPlaced = i;
        break;
      }
    }

    if (rowPlaced !== -1) {
      setBoard(newBoard);
      const newWinner = checkForWin(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else if (isBoardFull(newBoard)) {
        setIsDraw(true);
      } else {
        setCurrentPlayer(currentPlayer === '1' ? '2' : '1');
      }
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('1');
    setWinner(null);
    setIsDraw(false);
  };

  const renderStatus = () => {
    if (winner) {
        return <h2 className="text-2xl font-bold text-primary flex items-center gap-2"><Award />Player {winner} Wins!</h2>
    }
    if(isDraw) {
        return <h2 className="text-2xl font-bold text-muted-foreground">It's a Draw!</h2>
    }
    return <h2 className="text-2xl font-bold">Player {currentPlayer}'s Turn</h2>
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {renderStatus()}
      <div className="p-4 bg-blue-800 rounded-lg shadow-2xl border-4 border-blue-900 inline-block">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-12 h-12 md:w-16 md:h-16 bg-blue-900 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => handleColumnClick(colIndex)}
              >
                {cell && (
                  <div
                    className={cn(
                      'w-10 h-10 md:w-14 md:h-14 rounded-full shadow-inner',
                      cell === '1' ? 'bg-red-500' : 'bg-yellow-400'
                    )}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}
