
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import GameScreen from './components/GameScreen';
import LevelCompleteModal from './components/LevelCompleteModal';
import Slideshow from './components/Slideshow';
import { GameState } from './types';
import { LEVELS } from './constants';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.Login);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    const handleStart = useCallback(() => {
        setGameState(GameState.Playing);
    }, []);

    const handleLevelComplete = useCallback(() => {
        if (currentLevelIndex >= LEVELS.length - 1) {
            setGameState(GameState.GameComplete);
        } else {
            setGameState(GameState.LevelComplete);
        }
    }, [currentLevelIndex]);

    const handleNextLevel = useCallback(() => {
        setCurrentLevelIndex(prev => prev + 1);
        setGameState(GameState.Playing);
    }, []);

    const handleShowSlideshow = useCallback(() => {
        setGameState(GameState.Slideshow);
    }, []);

    const handleRestart = useCallback(() => {
        setCurrentLevelIndex(0);
        setGameState(GameState.Login);
    }, []);


    const currentLevelData = LEVELS[currentLevelIndex];

    return (
        <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
            {gameState === GameState.Login && <LoginScreen onStart={handleStart} />}
            
            {gameState === GameState.Playing && currentLevelData && (
                <GameScreen
                    key={currentLevelIndex}
                    level={currentLevelData}
                    onLevelComplete={handleLevelComplete}
                />
            )}

            {(gameState === GameState.LevelComplete || gameState === GameState.GameComplete) && currentLevelData && (
                <>
                    <GameScreen
                        level={currentLevelData}
                        onLevelComplete={() => {}}
                        isInteractable={false}
                    />
                    <LevelCompleteModal
                        message={currentLevelData.message}
                        isFinalLevel={gameState === GameState.GameComplete}
                        onNextLevel={handleNextLevel}
                        onShowSlideshow={handleShowSlideshow}
                    />
                </>
            )}

            {gameState === GameState.Slideshow && (
                <Slideshow onRestart={handleRestart} />
            )}
        </div>
    );
};

export default App;
