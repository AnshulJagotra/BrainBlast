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
        word: "BRAINWAVE",
        initial: [
            ['B','R','','','N','','A','','E'],
            ['','A','I','N','','A','V','E',''],
            ['A','','N','','A','V','','B','R'],
            ['I','N','','A','V','','B','R','A'],
            ['N','','A','V','E','B','R','','I'],
            ['W','A','V','E','B','','A','I','N'],
            ['A','','E','B','R','A','I','','W'],
            ['V','E','B','','A','','N','W','A'],
            ['E','B','','A','I','N','W','A',''],
        ],
        solution: [
            ['B','R','A','I','N','W','A','V','E'],
            ['R','A','I','N','W','A','V','E','B'],
            ['A','I','N','W','A','V','E','B','R'],
            ['I','N','W','A','V','E','B','R','A'],
            ['N','W','A','V','E','B','R','A','I'],
            ['W','A','V','E','B','R','A','I','N'],
            ['A','V','E','B','R','A','I','N','W'],
            ['V','E','B','R','A','I','N','W','A'],
            ['E','B','R','A','I','N','W','A','V'],
        ]
    },
    {
        word: "GENIUS",
        initial: [
            ["G", "", "", "", "", "U"],
            ["", "", "E", "I", "", ""],
            ["", "I", "", "", "S", ""],
            ["", "S", "", "", "G", ""],
            ["", "", "N", "U", "", ""],
            ["U", "", "", "", "", "E"],
        ],
        solution: [
            ["G", "N", "I", "S", "E", "U"],
            ["S", "U", "E", "I", "N", "G"],
            ["E", "I", "G", "N", "S", "U"],
            ["N", "S", "U", "E", "G", "I"],
            ["I", "E", "N", "U", "S", "G"],
            ["U", "G", "S", "N", "I", "E"],
        ]
    },
    {
        word: "PUZZLE",
        initial: [
            ["P", "", "", "", "L", ""],
            ["", "L", "", "E", "", ""],
            ["", "Z", "U", "", "", "P"],
            ["E", "", "", "Z", "L", ""],
            ["", "", "L", "", "E", ""],
            ["", "P", "", "", "", "U"],
        ],
        solution: [
            ["P", "U", "E", "Z", "L", "Z"],
            ["Z", "L", "P", "E", "U", "E"],
            ["L", "Z", "U", "L", "E", "P"],
            ["E", "U", "P", "Z", "L", "L"],
            ["U", "Z", "L", "P", "E", "Z"],
            ["Z", "P", "E", "L", "Z", "U"],
        ]
    },
    {
        word: "MEMORY",
        initial: [
            ["M", "", "R", "", "E", ""],
            ["", "E", "", "O", "", ""],
            ["O", "", "", "", "", "M"],
            ["", "M", "", "R", "", "E"],
            ["", "", "E", "", "M", ""],
            ["Y", "", "", "", "", "R"],
        ],
        solution: [
            ["M", "O", "R", "Y", "E", "M"],
            ["R", "E", "M", "O", "Y", "O"],
            ["O", "Y", "E", "M", "R", "M"],
            ["O", "M", "Y", "R", "O", "E"],
            ["R", "R", "E", "Y", "M", "O"],
            ["Y", "M", "O", "E", "O", "R"],
        ]
    },
    {
        word: "LOGIC",
        initial: [
            ["", "O", "", "", "C"],
            ["C", "", "G", "", ""],
            ["I", "", "", "L", ""],
            ["", "", "L", "", "G"],
            ["G", "", "", "C", ""],
        ],
        solution: [
            ["L", "O", "I", "G", "C"],
            ["C", "L", "G", "I", "O"],
            ["I", "G", "C", "L", "O"],
            ["O", "C", "L", "O", "G"],
            ["G", "I", "O", "C", "L"],
        ]
    },
    {
        word: "WIZARD",
        initial: [
            ["W", "", "Z", "", "R", ""],
            ["", "R", "", "A", "", ""],
            ["I", "", "", "", "D", "W"],
            ["", "D", "", "W", "", "I"],
            ["", "", "A", "", "I", ""],
            ["", "I", "", "D", "", "Z"],
        ],
        solution: [
            ["W", "A", "Z", "I", "R", "D"],
            ["D", "R", "I", "A", "Z", "W"],
            ["I", "Z", "R", "A", "D", "W"],
            ["A", "D", "W", "W", "R", "I"],
            ["Z", "W", "A", "R", "I", "D"],
            ["R", "I", "D", "D", "W", "Z"],
        ]
    },
    {
        word: "PLANET",
        initial: [
            ["", "L", "", "N", "", ""],
            ["", "", "E", "", "A", "P"],
            ["A", "", "", "L", "T", ""],
            ["", "T", "L", "", "", "N"],
            ["P", "A", "", "T", "", ""],
            ["", "", "T", "", "P", ""],
        ],
        solution: [
            ["T", "L", "P", "N", "E", "A"],
            ["N", "T", "E", "L", "A", "P"],
            ["A", "P", "N", "L", "T", "E"],
            ["E", "T", "L", "A", "P", "N"],
            ["P", "A", "L", "T", "N", "E"],
            ["L", "N", "T", "E", "P", "A"],
        ]
    },
    {
        word: "SQUARE",
        initial: [
            ["S", "", "", "", "A", ""],
            ["", "A", "", "R", "", ""],
            ["U", "", "R", "", "E", ""],
            ["", "E", "", "Q", "", "A"],
            ["", "", "A", "", "S", ""],
            ["", "S", "", "", "", "R"],
        ],
        solution: [
            ["S", "R", "Q", "E", "A", "U"],
            ["E", "A", "U", "R", "Q", "S"],
            ["U", "Q", "R", "S", "E", "A"],
            ["R", "E", "S", "Q", "U", "A"],
            ["Q", "U", "A", "E", "S", "R"],
            ["A", "S", "E", "U", "R", "Q"],
        ]
    },
    {
        word: "GHOSTLY",
        initial: [
            ["G","","","","T","L",""],
            ["","","O","","","","Y"],
            ["","S","","H","","",""],
            ["H","","G","","S","","T"],
            ["","","","G","","H",""],
            ["Y","","","","L","",""],
            ["","L","T","","","","G"],
        ],
        solution: [
            ["G","H","S","Y","T","L","O"],
            ["L","T","O","S","G","H","Y"],
            ["T","S","Y","H","O","G","L"],
            ["H","O","G","L","S","Y","T"],
            ["S","Y","L","G","O","H","T"],
            ["Y","G","H","T","L","O","S"],
            ["O","L","T","S","H","Y","G"],
        ]
    },
    {
        word: "KEYBOARD",
        initial: [
            ["K","","Y","","O","","R","D"],
            ["E","Y","","O","","R","D","K"],
            ["Y","B","O","","R","","K",""],
            ["B","O","A","R","","K","E","Y"],
            ["O","A","","D","K","E","Y","B"],
            ["A","","D","K","E","","B","O"],
            ["R","D","K","E","","B","O",""],
            ["D","K","E","","B","O","A","R"],
        ],
        solution: [
            ["K","E","Y","B","O","A","R","D"],
            ["E","Y","B","O","A","R","D","K"],
            ["Y","B","O","A","R","D","K","E"],
            ["B","O","A","R","D","K","E","Y"],
            ["O","A","R","D","K","E","Y","B"],
            ["A","R","D","K","E","Y","B","O"],
            ["R","D","K","E","Y","B","O","A"],
            ["D","K","E","Y","B","O","A","R"],
        ]
    }
];


type CellStatus = 'correct' | 'incorrect' | 'default';

export function WordokuBoard() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [board, setBoard] = useState<string[][]>([]);
  const [cellStatuses, setCellStatuses] = useState<CellStatus[][]>([]);
  const [showWinDialog, setShowWinDialog] = useState(false);

  const currentPuzzle = puzzles[currentPuzzleIndex];
  const gridSize = currentPuzzle.word.length;

  const resetBoard = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    setCurrentPuzzleIndex(randomIndex);
    const newPuzzle = puzzles[randomIndex];
    setBoard(newPuzzle.initial.map(row => [...row]));
    setCellStatuses(Array(newPuzzle.word.length).fill(0).map(() => Array(newPuzzle.word.length).fill('default')));
    setShowWinDialog(false);
  }, []);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const char = value.toUpperCase();
    if ((char === '' || currentPuzzle.word.includes(char)) && char.length <= 1) {
      const newBoard = board.map((r, rowIndex) =>
        rowIndex === row
          ? r.map((c, colIndex) => (colIndex === col ? char : c))
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
    const newStatuses = Array(gridSize).fill(0).map(() => Array(gridSize).fill('default'));

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (currentPuzzle.initial[i][j] === '') {
          if (board[i][j] === '') {
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
    return <div>Loading...</div>;
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
       <div className="mb-4 p-4 bg-muted rounded-lg">
        <p className="text-lg font-semibold text-center">Use the letters from the word: <span className="font-bold text-primary tracking-widest">{currentPuzzle.word}</span></p>
      </div>
      <div 
        className="grid bg-border rounded-md overflow-hidden border-2 border-border shadow-lg aspect-square w-full max-w-md"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
             const isReadOnly = currentPuzzle.initial[rowIndex][colIndex] !== '';
             const status = cellStatuses[rowIndex][colIndex];
             const isSubgridBoundaryBottom = gridSize === 9 ? (rowIndex + 1) % 3 === 0 && rowIndex !== 8 : gridSize === 8 ? (rowIndex + 1) % 4 === 0 && rowIndex !== 7 : (rowIndex + 1) % 2 === 0 && rowIndex !== gridSize - 1;
             const isSubgridBoundaryRight = gridSize === 9 ? (colIndex + 1) % 3 === 0 && colIndex !== 8 : gridSize === 8 ? (colIndex + 1) % 4 === 0 && colIndex !== 7 : (colIndex + 1) % 2 === 0 && colIndex !== gridSize - 1;

             return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength={1}
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                readOnly={isReadOnly}
                className={cn(
                  "w-full h-full aspect-square text-center text-xl md:text-2xl font-bold bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:z-10",
                  getCellClass(status, isReadOnly),
                  isSubgridBoundaryBottom ? 'border-b-2 border-border' : '',
                  isSubgridBoundaryRight ? 'border-r-2 border-border' : '',
                  'border-t border-l border-border/50'
                )}
              />
            )})
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
                <Smile className="text-green-500 h-6 w-6"/> Fantastic!
            </AlertDialogTitle>
            <AlertDialogDescription>
              You've solved the Wordoku! Your brain is definitely getting a workout.
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
