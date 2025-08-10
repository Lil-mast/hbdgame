
import React from 'react';

interface LevelCompleteModalProps {
    message: string;
    isFinalLevel: boolean;
    onNextLevel: () => void;
    onShowSlideshow?: () => void;
}

const GiftBoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className}>
        <rect x="15" y="45" width="70" height="40" rx="5" fill="#fbcfe8" />
        <rect x="45" y="45" width="10" height="40" fill="#fcd34d" />
        <rect x="15" y="60" width="70" height="10" fill="#fcd34d" />
        <path d="M40 30 C 40 20, 60 20, 60 30 L 60 45 H 40 Z" fill="#fcd34d" />
        <path d="M30 15 C 30 5, 45 5, 45 15 L 45 30 H 30 Z" fill="#fcd34d" style={{transformOrigin: '30px 30px'}} className="group-hover:rotate-[-30deg] transition-transform duration-500" />
        <path d="M70 15 C 70 5, 55 5, 55 15 L 55 30 H 70 Z" fill="#fcd34d" style={{transformOrigin: '70px 30px'}} className="group-hover:rotate-[30deg] transition-transform duration-500" />
    </svg>
);


const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ message, isFinalLevel, onNextLevel, onShowSlideshow }) => {
    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="bg-gradient-to-br from-purple-800 to-blue-800 p-8 rounded-2xl shadow-2xl border border-white/20 max-w-lg text-center m-4">
                <div className="group w-40 h-40 mx-auto mb-6">
                    <GiftBoxIcon className="w-full h-full" />
                </div>
                
                <h2 className="font-title text-4xl text-pink-300 mb-4">{isFinalLevel ? 'Happy Birthday!' : 'Level Complete!'}</h2>
                <p className="text-xl text-white mb-8 leading-relaxed">"{message}"</p>
                
                {isFinalLevel ? (
                    <button onClick={onShowSlideshow} className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg text-xl pulse transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-800">
                        See Your Gift
                    </button>
                ) : (
                    <button onClick={onNextLevel} className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg text-xl jiggle transition-transform duration-200 transform hover:scale-105">
                        Next Message
                    </button>
                )}
            </div>
        </div>
    );
};

export default LevelCompleteModal;
