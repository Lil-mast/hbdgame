
import React, { useState, useEffect, useCallback } from 'react';
import { Level, PieceType, LevelGoal } from '../types';
import GameBoard from './GameBoard';
import { PIECE_ICONS } from '../constants';

interface GameScreenProps {
    level: Level;
    onLevelComplete: () => void;
    isInteractable?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onLevelComplete, isInteractable = true }) => {
    const [score, setScore] = useState(0);
    const [movesLeft, setMovesLeft] = useState(level.moves);
    const [goals, setGoals] = useState<LevelGoal[]>(() => JSON.parse(JSON.stringify(level.goals)));

    const handleGoalUpdate = useCallback((type: PieceType, count: number) => {
        setGoals(prevGoals => {
            return prevGoals.map(goal => {
                if (goal.type === type) {
                    return { ...goal, count: Math.max(0, goal.count - count) };
                }
                return goal;
            });
        });
    }, []);

    const handleMove = useCallback(() => {
        setMovesLeft(prev => prev - 1);
    }, []);

    useEffect(() => {
        const allGoalsMet = goals.every(g => g.count === 0);
        if (allGoalsMet) {
            // A short delay to allow final animations to play
            setTimeout(() => onLevelComplete(), 500);
        } else if (movesLeft <= 0) {
            // Handle game over logic here if needed (e.g., show a "Try Again" modal)
            console.log("Out of moves!");
        }
    }, [goals, movesLeft, onLevelComplete]);
    
    // Final level is just a message screen
    useEffect(() => {
      if (level.level === 6) {
        setTimeout(() => onLevelComplete(), 100);
      }
    }, [level.level, onLevelComplete]);


    if (level.level === 6 && isInteractable) {
        return <div className="w-full h-full flex items-center justify-center"><p className="text-2xl animate-pulse">...</p></div>;
    }


    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-2 md:p-4 gap-2 md:gap-8 game-container">
            {/* UI Panel - Mobile: Top, Desktop: Right */}
            <div className="w-full md:w-64 flex-shrink-0 bg-black/20 p-3 md:p-6 rounded-2xl border border-white/20 backdrop-blur-sm space-y-3 md:space-y-6 ui-panel">
                <h2 className="font-title text-2xl md:text-4xl text-center text-blue-300">Level {level.level}</h2>
                
                <div>
                    <h3 className="text-base md:text-lg font-semibold text-pink-300 mb-1 md:mb-2">Joy Points</h3>
                    <div className="bg-black/30 p-2 md:p-3 rounded-lg text-lg md:text-2xl font-bold text-center text-white">{score}</div>
                </div>

                <div>
                    <h3 className="text-base md:text-lg font-semibold text-pink-300 mb-1 md:mb-2">Moves Left</h3>
                    <div className="bg-black/30 p-2 md:p-3 rounded-lg text-lg md:text-2xl font-bold text-center text-white">{movesLeft}</div>
                </div>

                <div>
                    <h3 className="text-base md:text-lg font-semibold text-pink-300 mb-1 md:mb-2">Goals</h3>
                    <div className="space-y-1 md:space-y-2">
                        {goals.map((goal, index) => {
                             const originalGoal = level.goals.find(g => g.type === goal.type);
                             const Icon = PIECE_ICONS[goal.type];
                             return (
                                <div key={index} className="bg-black/30 p-2 md:p-3 rounded-lg flex items-center justify-between">
                                    <div className="w-6 h-6 md:w-8 md:h-8"><Icon/></div>
                                    <div className="text-sm md:text-lg font-semibold">{goal.count} / {originalGoal?.count || 0}</div>
                                </div>
                             );
                        })}
                    </div>
                </div>
            </div>

            {/* Game Board - Mobile: Bottom, Desktop: Left */}
            <GameBoard 
                level={level}
                onScoreUpdate={setScore}
                onGoalUpdate={handleGoalUpdate}
                onMove={handleMove}
                isInteractable={isInteractable}
            />
        </div>
    );
};

export default GameScreen;
