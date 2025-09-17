"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Smile } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const puzzles = [
    {
        initial: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ],
        solution: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]
    },
    {
        initial: [
            [0, 0, 0, 2, 6, 0, 7, 0, 1],
            [6, 8, 0, 0, 7, 0, 0, 9, 0],
            [1, 9, 0, 0, 0, 4, 5, 0, 0],
            [8, 2, 0, 1, 0, 0, 0, 4, 0],
            [0, 0, 4, 6, 0, 2, 9, 0, 0],
            [0, 5, 0, 0, 0, 3, 0, 2, 8],
            [0, 0, 9, 3, 0, 0, 0, 7, 4],
            [0, 4, 0, 0, 5, 0, 0, 3, 6],
            [7, 0, 3, 0, 1, 8, 0, 0, 0],
        ],
        solution: [
            [4, 3, 5, 2, 6, 9, 7, 8, 1],
            [6, 8, 2, 5, 7, 1, 4, 9, 3],
            [1, 9, 7, 8, 3, 4, 5, 6, 2],
            [8, 2, 6, 1, 9, 5, 3, 4, 7],
            [3, 7, 4, 6, 8, 2, 9, 1, 5],
            [9, 5, 1, 7, 4, 3, 6, 2, 8],
            [5, 1, 9, 3, 2, 6, 8, 7, 4],
            [2, 4, 8, 9, 5, 7, 1, 3, 6],
            [7, 6, 3, 4, 1, 8, 2, 5, 9],
        ]
    },
    {
        initial: [
            [2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 0, 3],
            [0, 7, 4, 0, 8, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 2],
            [0, 8, 0, 0, 4, 0, 0, 1, 0],
            [6, 0, 0, 5, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 7, 8, 0],
            [5, 0, 0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 4],
        ],
        solution: [
            [2, 6, 3, 1, 5, 4, 8, 9, 7],
            [8, 5, 1, 6, 7, 2, 4, 3, 3],
            [9, 7, 4, 3, 8, 5, 1, 2, 6],
            [4, 1, 5, 8, 9, 3, 6, 7, 2],
            [3, 8, 7, 2, 4, 6, 9, 1, 5],
            [6, 9, 2, 5, 1, 7, 3, 4, 8],
            [4, 2, 6, 9, 1, 5, 7, 8, 3],
            [5, 3, 8, 7, 6, 9, 2, 4, 1],
            [1, 7, 9, 3, 2, 8, 5, 6, 4],
        ]
    },
    {
        initial: [
            [0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 0, 3],
            [0, 7, 4, 0, 8, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 2],
            [0, 8, 0, 0, 4, 0, 0, 1, 0],
            [6, 0, 0, 5, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 7, 8, 0],
            [5, 0, 0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 4],
        ],
        solution: [
            [1, 2, 6, 4, 3, 7, 9, 5, 8],
            [8, 9, 5, 6, 2, 1, 4, 7, 3],
            [3, 7, 4, 9, 8, 5, 1, 2, 6],
            [4, 5, 7, 1, 9, 3, 8, 6, 2],
            [9, 8, 3, 2, 4, 6, 5, 1, 7],
            [6, 1, 2, 5, 7, 8, 3, 9, 4],
            [2, 6, 9, 3, 1, 4, 7, 8, 5],
            [5, 3, 8, 7, 6, 9, 2, 4, 1],
            [7, 4, 1, 8, 5, 2, 6, 3, 4],
        ]
    },
    {
        initial: [
            [0, 0, 0, 0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 3, 5, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 7, 0],
            [7, 0, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 4, 0, 0, 8, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0, 0],
            [8, 0, 0, 0, 0, 0, 0, 4, 0],
        ],
        solution: [
            [6, 7, 5, 8, 9, 4, 2, 1, 3],
            [2, 3, 8, 7, 1, 5, 4, 6, 9],
            [4, 1, 9, 6, 2, 3, 5, 7, 8],
            [7, 8, 6, 2, 5, 1, 3, 9, 4],
            [1, 9, 3, 4, 6, 7, 8, 2, 5],
            [5, 4, 2, 3, 8, 9, 1, 7, 6],
            [3, 5, 1, 9, 4, 6, 7, 8, 2],
            [9, 6, 4, 1, 2, 8, 7, 3, 5],
            [8, 2, 7, 5, 3, 6, 9, 4, 1],
        ]
    },
    {
        initial: [
            [0, 0, 0, 6, 0, 0, 4, 0, 0],
            [7, 0, 0, 0, 0, 3, 6, 0, 0],
            [0, 0, 0, 0, 9, 1, 0, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 5, 0, 1, 8, 0, 0, 0, 3],
            [0, 0, 0, 3, 0, 6, 0, 4, 5],
            [0, 4, 0, 2, 0, 0, 0, 6, 0],
            [9, 0, 3, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 1, 0, 0],
        ],
        solution: [
            [1, 3, 2, 6, 5, 8, 4, 9, 7],
            [7, 9, 8, 4, 2, 3, 6, 5, 1],
            [6, 4, 5, 7, 9, 1, 3, 8, 2],
            [3, 8, 4, 5, 7, 9, 2, 1, 6],
            [2, 5, 6, 1, 8, 4, 9, 7, 3],
            [1, 7, 9, 3, 2, 6, 8, 4, 5],
            [8, 4, 1, 2, 3, 5, 7, 6, 9],
            [9, 1, 3, 8, 6, 7, 5, 2, 4],
            [5, 2, 7, 9, 4, 1, 1, 3, 8],
        ]
    }
];

type CellStatus = 'correct' | 'incorrect' | 'default';

export function SudokuBoard() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [board, setBoard] = useState<number[][]>([]);
  const [cellStatuses, setCellStatuses] = useState<CellStatus[][]>([]);
  const [showWinDialog, setShowWinDialog] = useState(false);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const initializeStatuses = useCallback(() => Array(9).fill(0).map(() => Array(9).fill('default')), []);

  const resetBoard = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    setCurrentPuzzleIndex(randomIndex);
    const newPuzzle = puzzles[randomIndex];
    setBoard(newPuzzle.initial.map(row => [...row]));
    setCellStatuses(initializeStatuses());
    setShowWinDialog(false);
  }, [initializeStatuses]);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);
  
  const handleInputChange = (row: number, col: number, value: string) => {
    const num = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 9) {
      const newBoard = board.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((c, colIndex) => (colIndex === col ? num : c))
          : [...r]
      );
      setBoard(newBoard);
      
      const newStatuses = cellStatuses.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((c, colIndex) => (colIndex === col ? 'default' : c))
          : [...r]
      );
      setCellStatuses(newStatuses);
    }
  };

  const checkSolution = () => {
    let allCorrect = true;
    let boardFull = true;
    const newStatuses = initializeStatuses();
    
    for(let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(currentPuzzle.initial[i][j] === 0) { // Check only user-filled cells
                if(board[i][j] === 0) {
                    boardFull = false;
                    allCorrect = false;
                    continue;
                }
                if (board[i][j] === currentPuzzle.solution[i][j]) {
                    newStatuses[i][j] = 'correct';
                } else {
                    newStatuses[i][j] = 'incorrect';
                    allCorrect = false;
                }
            }
        }
    }
    setCellStatuses(newStatuses);

    if (boardFull && allCorrect) {
        setShowWinDialog(true);
    }
  };

  if (!board.length) {
    return <div>Loading...</div>
  }

  const getCellClass = (status: CellStatus, isReadOnly: boolean) => {
    if(isReadOnly) return 'text-muted-foreground';
    switch (status) {
        case 'correct':
            return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
        case 'incorrect':
            return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
        default:
            return 'text-primary';
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-9 bg-border rounded-md overflow-hidden border-2 border-border shadow-lg aspect-square w-full max-w-md">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isReadOnly = currentPuzzle.initial[rowIndex][colIndex] !== 0;
            const status = cellStatuses[rowIndex][colIndex];
            return (
                <input
                    key={`${rowIndex}-${colIndex}`}
                    type="number"
                    min="1"
                    max="9"
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    readOnly={isReadOnly}
                    className={cn(
                        "w-full h-full aspect-square text-center text-xl md:text-2xl font-bold bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:z-10",
                        getCellClass(status, isReadOnly),
                        (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-border' : '',
                        (colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-border' : '',
                        'border-t border-l border-border/50'
                    )}
                />
            )
        })
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={checkSolution}>Check Solution</Button>
        <Button onClick={resetBoard} variant="outline">Reset</Button>
      </div>

      <AlertDialog open={showWinDialog} onOpenChange={setShowWinDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <Smile className="text-green-500 h-6 w-6"/> Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have successfully solved the puzzle! Well done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetBoard}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
