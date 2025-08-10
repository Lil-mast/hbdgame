
import React from 'react';
import { Level, PieceType, PowerUpType } from './types';

// Board dimensions
export const BOARD_SIZE = 8;
export const CELL_SIZE_PX = 64; // For positioning calculations

// Game Piece Icons
export const CupcakeIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg"><g transform="rotate(0 50 50)"><path d="M20 50 C20 30, 80 30, 80 50 Q95 65, 80 75 C80 85, 20 85, 20 75 Q5 65, 20 50 Z" fill="#2563eb" /><path d="M25 75 L20 95 H80 L75 75 Z" fill="#a5b4fc" /><line x1="20" y1="82" x2="80" y2="82" stroke="#6366f1" strokeWidth="4" /><circle cx="50" cy="35" r="8" fill="#ef4444" /></g></svg>
);
export const GiftBoxIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg"><g transform="rotate(0 50 50)"><rect x="20" y="40" width="60" height="40" rx="5" fill="#fbcfe8" /><rect x="45" y="40" width="10" height="40" fill="#fcd34d" /><rect x="20" y="55" width="60" height="10" fill="#fcd34d" /><path d="M40 25 C 40 15, 60 15, 60 25 L 60 40 H 40 Z" fill="#fcd34d" /></g></svg>
);
export const PartyHatIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg"><g transform="rotate(0 50 50)"><polygon points="50,10 20,90 80,90" fill="url(#hatGradient)"/><defs><linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#d8b4fe" /></linearGradient></defs><circle cx="35" cy="70" r="5" fill="#fef08a"/><circle cx="65" cy="50" r="5" fill="#fef08a"/><circle cx="50" cy="30" r="5" fill="#fef08a"/></g></svg>
);
export const CookieIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg"><g transform="rotate(15 50 50)"><path d="M50 5 L61 35 L95 35 L72 55 L83 85 L50 65 L17 85 L28 55 L5 35 L39 35 Z" fill="#f59e0b" /></g></svg>
);
export const MonogramIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg"><g transform="rotate(0 50 50)"><rect x="20" y="20" width="60" height="60" rx="10" fill="#78350f" /><text x="50" y="68" className="font-title text-6xl fill-amber-200" textAnchor="middle">M</text></g></svg>
);

// Power-Up Icons
export const CandleIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl animate-pulse"><rect x="40" y="20" width="20" height="60" fill="#f0f0f0"/><rect x="40" y="20" width="20" height="15" fill="#f87171"/><rect x="40" y="50" width="20" height="15" fill="#f87171"/><path d="M50 5 C 55 10, 45 10, 50 20 Z" fill="#f59e0b" transform-origin="50px 20px" className="animate-flicker" style={{animation: 'flicker 1.5s infinite'}}/><style>{`@keyframes flicker { 0%, 100% {transform: scaleY(1);} 50% {transform: scaleY(0.8) scaleX(1.1);}}`}</style></svg>
);
export const PopperIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl"><polygon points="20,60 30,20 70,20 80,60" fill="#06b6d4"/><rect x="20" y="60" width="60" height="20" rx="5" fill="#0891b2"/><circle cx="35" cy="40" r="4" fill="#facc15"/><circle cx="65" cy="40" r="4" fill="#4ade80"/><circle cx="50" cy="55" r="4" fill="#f472b6"/></svg>
);
export const CakeIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl"><path d="M10 50 L50 10 L90 50 L50 90 Z" fill="#fecdd3" /><path d="M50 10 L90 50 V90 L50 50 Z" fill="#fb7185" /><path d="M15 50 L50 20 L85 50 L50 80 Z" fill="white" /><circle cx="50" cy="40" r="8" fill="#ef4444" /></svg>
);

export const PIECE_ICONS: Record<PieceType, React.FC> = {
    [PieceType.Cupcake]: CupcakeIcon,
    [PieceType.GiftBox]: GiftBoxIcon,
    [PieceType.PartyHat]: PartyHatIcon,
    [PieceType.Cookie]: CookieIcon,
    [PieceType.Monogram]: MonogramIcon,
};

export const POWERUP_ICONS: Record<Exclude<PowerUpType, PowerUpType.None>, React.FC> = {
    [PowerUpType.CandleV]: CandleIcon,
    [PowerUpType.CandleH]: CandleIcon,
    [PowerUpType.Popper]: PopperIcon,
    [PowerUpType.Cake]: CakeIcon,
};

export const ALL_PIECE_TYPES = [
    PieceType.Cupcake,
    PieceType.GiftBox,
    PieceType.PartyHat,
    PieceType.Cookie,
    PieceType.Monogram
];

export const LEVELS: Level[] = [
    {
        level: 1,
        moves: 15,
        goals: [{ type: PieceType.Cupcake, count: 20 }],
        message: "You make ordinary days feel magical.",
    },
    {
        level: 2,
        moves: 20,
        goals: [{ type: PieceType.GiftBox, count: 25 }],
        message: "Your voice is my favorite sound.",
    },
    {
        level: 3,
        moves: 22,
        goals: [
            { type: PieceType.PartyHat, count: 15 },
            { type: PieceType.Cookie, count: 15 },
        ],
        message: "In your eyes, I see home.",
    },
    {
        level: 4,
        moves: 25,
        goals: [{ type: PieceType.Monogram, count: 10 }],
        message: "Forever feels possible with you.",
    },
    {
        level: 5,
        moves: 28,
        goals: [
            { type: PieceType.Cupcake, count: 30 },
            { type: PieceType.GiftBox, count: 30 },
        ],
        message: "You’re the calm in my chaos.",
    },
    {
        level: 6,
        moves: 1,
        goals: [],
        message: "Every moment with you is poetry. Happy Birthday, Michelle!",
    },
];

