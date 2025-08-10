
import React from 'react';
import { GamePiece, PowerUpType } from '../types';
import { PIECE_ICONS, POWERUP_ICONS } from '../constants';

interface GamePieceProps {
    piece: GamePiece;
    onClick: (piece: GamePiece) => void;
    isSelected: boolean;
}

const GamePieceComponent: React.FC<GamePieceProps> = ({ piece, onClick, isSelected }) => {
    const Icon = piece.powerUp !== PowerUpType.None 
        ? POWERUP_ICONS[piece.powerUp]
        : PIECE_ICONS[piece.type];

    return (
        <div
            onClick={() => onClick(piece)}
            className="w-full h-full p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{
                gridRow: piece.row + 1,
                gridColumn: piece.col + 1,
            }}
        >
            <div className={`w-full h-full rounded-lg transition-all duration-200 ${isSelected ? 'bg-white/30 scale-110 ring-2 ring-cyan-400' : ''}`}>
                <Icon />
            </div>
        </div>
    );
};

export default GamePieceComponent;
