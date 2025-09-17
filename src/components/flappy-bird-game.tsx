"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const GAME_WIDTH = 320;
const GAME_HEIGHT = 480;
const BIRD_SIZE = 24;
const GRAVITY = 0.5;
const JUMP_HEIGHT = -6; 
const PIPE_WIDTH = 40;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;

const Bird = ({ top }: { top: number }) => (
    <svg 
        viewBox="0 0 30 30" 
        style={{
            position: 'absolute',
            top,
            left: GAME_WIDTH / 4,
            width: BIRD_SIZE + 6,
            height: BIRD_SIZE + 6,
            fill: '#facc15', // yellow-400
            stroke: '#1e293b', // slate-800
            strokeWidth: 1.5,
            transform: 'rotate(-15deg)',
        }}
    >
        <path d="M15,2 C22,2 28,8 28,15 C28,22 22,28 15,28 C8,28 2,22 2,15 C2,8 8,2 15,2 Z" />
        <circle cx="20" cy="12" r="2" fill="black" />
        <path d="M25,14 C27,12 29,14 27,16 C25,18 23,16 25,14 Z" fill="#f97316" />
        <path d="M12,20 L5,25 L8,20 Z" fill="#f97316" />
    </svg>
);

const Pipe = ({ top, height }: { top: number; height: number }) => (
  <div style={{
    position: 'absolute',
    top,
    left: 0,
    width: PIPE_WIDTH,
    height,
    backgroundColor: 'green'
  }} />
);

export function FlappyBirdGame() {
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<{ x: number; gapY: number; scored: boolean; }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef<number>();
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setGameStarted(false);
    setBirdPosition(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([{ x: GAME_WIDTH, gapY: GAME_HEIGHT / 2, scored: false }]);
    setScore(0);
    setGameOver(false);
    gameContainerRef.current?.focus();
  };

  useEffect(() => {
    resetGame();
  }, []);

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setBirdVelocity(JUMP_HEIGHT);
    }
  };
  
  const jump = () => {
      if (!gameOver) {
        if (!gameStarted) {
            startGame();
        } else {
            setBirdVelocity(JUMP_HEIGHT);
        }
    }
  }

  const gameLoop = () => {
    if (gameOver || !gameStarted) return;

    // Bird physics
    setBirdVelocity(v => v + GRAVITY);
    setBirdPosition(p => {
        const newPos = p + birdVelocity;
        if (newPos > GAME_HEIGHT - BIRD_SIZE || newPos < 0) {
            setGameOver(true);
            return p;
        }
        return newPos;
    });

    // Pipe movement
    setPipes(prevPipes => {
        const newPipes = prevPipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
        
        // Scoring
        const birdX = GAME_WIDTH / 4;
        const passedPipe = newPipes.find(pipe => !pipe.scored && pipe.x + PIPE_WIDTH < birdX);
        if (passedPipe) {
            setScore(s => s + 1);
            passedPipe.scored = true;
        }
        
        // Add new pipe
        const lastPipe = newPipes[newPipes.length - 1];
        if (lastPipe && lastPipe.x < GAME_WIDTH - 200) {
            const newGapY = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
            newPipes.push({ x: GAME_WIDTH, gapY: newGapY, scored: false });
        }
        
        // Collision detection
        const birdLeft = GAME_WIDTH / 4;
        const birdRight = birdLeft + BIRD_SIZE;
        const birdTop = birdPosition;
        const birdBottom = birdTop + BIRD_SIZE;

        for (const pipe of newPipes) {
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + PIPE_WIDTH;
            const pipeTopEnd = pipe.gapY - PIPE_GAP / 2;
            const pipeBottomStart = pipe.gapY + PIPE_GAP / 2;

            const collidesWithTop = birdRight > pipeLeft && birdLeft < pipeRight && birdTop < pipeTopEnd;
            const collidesWithBottom = birdRight > pipeLeft && birdLeft < pipeRight && birdBottom > pipeBottomStart;

            if (collidesWithTop || collidesWithBottom) {
                setGameOver(true);
            }
        }

        return newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    const gameContainer = gameContainerRef.current;
    gameContainer?.addEventListener('touchstart', jump);

    return () => {
        window.removeEventListener('keydown', handleKeyPress);
        gameContainer?.removeEventListener('touchstart', jump);
    };
  }, [gameOver, gameStarted]);


  useEffect(() => {
    if (gameStarted && !gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
  }, [gameOver, gameStarted, birdPosition, birdVelocity, pipes]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={gameContainerRef}
        tabIndex={0}
        className="relative bg-cyan-200 overflow-hidden border-2 border-black"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={jump}
      >
        {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h2 className="text-2xl font-bold" style={{ textShadow: '2px 2px 4px #000000' }}>Tap or Press Space to Start</h2>
            </div>
        )}
        <Bird top={birdPosition} />
        {pipes.map((pipe, index) => (
          <div key={index} style={{ position: 'absolute', left: pipe.x, top: 0, height: '100%' }}>
            <Pipe top={0} height={pipe.gapY - PIPE_GAP / 2} />
            <Pipe top={pipe.gapY + PIPE_GAP / 2} height={GAME_HEIGHT - (pipe.gapY + PIPE_GAP / 2)} />
          </div>
        ))}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-bold text-white" style={{ textShadow: '2px 2px 4px #000000' }}>
            {score}
        </div>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <h2 className="text-4xl font-bold">Game Over</h2>
            <p>Your score: {score}</p>
          </div>
        )}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}
