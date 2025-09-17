"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, Apple, Angry } from 'lucide-react';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 40;
const OBJECT_SIZE = 30;
const OBJECT_SPEED = 3;
const BASKET_SPEED = 20;

const Basket = ({ x }: { x: number }) => (
  <div style={{
    position: 'absolute',
    bottom: 10,
    left: x,
    width: BASKET_WIDTH,
    height: BASKET_HEIGHT,
    color: '#8B4513'
  }}>
    <ShoppingBasket className="w-full h-full" />
  </div>
);

const FallingObject = ({ x, y, isRock }: { x: number; y: number; isRock: boolean }) => (
  <div style={{
    position: 'absolute',
    top: y,
    left: x,
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
  }}>
    {isRock ? <Angry className="w-full h-full text-gray-600" /> : <Apple className="w-full h-full text-red-500" />}
  </div>
);

export function FallingObjectsCatcherGame() {
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [objects, setObjects] = useState<{ x: number; y: number; isRock: boolean; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<number>();
  const objectTimerRef = useRef<NodeJS.Timeout>();

  const gameContainerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setBasketX(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
    setObjects([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const gameLoop = () => {
    if (gameOver) return;

    // Move objects
    setObjects(prev => {
        let newScore = score;
        let newLives = lives;
        const newObjects = prev
          .map(obj => ({ ...obj, y: obj.y + OBJECT_SPEED }))
          .filter(obj => {
            if (obj.y > GAME_HEIGHT) return false; // Off screen
            
            // Collision detection
            const basketRect = { x: basketX, y: GAME_HEIGHT - BASKET_HEIGHT - 10, width: BASKET_WIDTH, height: BASKET_HEIGHT };
            const objRect = { x: obj.x, y: obj.y, width: OBJECT_SIZE, height: OBJECT_SIZE };
            
            if (
                basketRect.x < objRect.x + objRect.width &&
                basketRect.x + basketRect.width > objRect.x &&
                basketRect.y < objRect.y + objRect.height &&
                basketRect.y + basketRect.height > objRect.y
            ) {
                if(obj.isRock) {
                    newLives--;
                } else {
                    newScore++;
                }
                return false; // Remove caught object
            }
            return true;
          });
        setScore(newScore);
        setLives(newLives);

        if (newLives <= 0) {
            setGameOver(true);
        }
        return newObjects;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (!gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        objectTimerRef.current = setInterval(() => {
            const newObject = {
                x: Math.random() * (GAME_WIDTH - OBJECT_SIZE),
                y: -OBJECT_SIZE,
                isRock: Math.random() < 0.35, // 35% chance of being a rock
                id: Date.now()
            };
            setObjects(prev => [...prev, newObject]);
        }, 1000);
    }
    return () => {
        if(gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        if(objectTimerRef.current) clearInterval(objectTimerRef.current);
    }
  }, [gameOver, basketX, lives, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (gameOver) return;
        if (e.key === 'ArrowLeft') {
            setBasketX(x => Math.max(0, x - BASKET_SPEED));
        } else if (e.key === 'ArrowRight') {
            setBasketX(x => Math.min(GAME_WIDTH - BASKET_WIDTH, x + BASKET_SPEED));
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);


  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={gameContainerRef}
        tabIndex={0}
        className="relative w-full max-w-[500px] bg-sky-200 border-2 border-gray-400 overflow-hidden cursor-pointer"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onMouseMove={(e) => {
            if (!gameOver) {
                const rect = e.currentTarget.getBoundingClientRect();
                const newX = e.clientX - rect.left - BASKET_WIDTH / 2;
                setBasketX(Math.max(0, Math.min(GAME_WIDTH - BASKET_WIDTH, newX)));
            }
        }}
      >
        <Basket x={basketX} />
        {objects.map(obj => (
            <FallingObject key={obj.id} x={obj.x} y={obj.y} isRock={obj.isRock} />
        ))}

        <div className="absolute top-2 left-2 text-lg font-bold text-gray-800">Score: {score}</div>
        <div className="absolute top-2 right-2 text-lg font-bold text-gray-800">Lives: {lives}</div>

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <h2 className="text-4xl font-bold">Game Over</h2>
            <p>Final Score: {score}</p>
          </div>
        )}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}
