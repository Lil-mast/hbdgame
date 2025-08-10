
import React from 'react';
import Sparkles from './Sparkles';

interface LoginScreenProps {
    onStart: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onStart }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <Sparkles count={50} />
            <div className="z-10 text-center flex flex-col items-center">
                <div className="relative mb-8 pulse">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full blur-xl opacity-75"></div>
                    <div className="relative w-40 h-40 bg-white/10 rounded-full flex items-center justify-center">
                        <svg className="w-24 h-24 text-pink-400 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </div>

                <h1 className="font-title text-6xl md:text-7xl text-white drop-shadow-md mb-4">Michelle's Birthday Crush</h1>
                <p className="text-lg text-blue-200 mb-10">A game made just for you.</p>

                <div className="bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-sm backdrop-blur-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-blue-200 mb-2">Username</label>
                        <input type="text" value="Michelle Mwaniki" readOnly className="w-full bg-white/10 p-3 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="mb-6">
                         <label className="block text-sm font-semibold text-blue-200 mb-2">Password</label>
                        <input type="password" value="mzee@20" readOnly className="w-full bg-white/10 p-3 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button onClick={onStart} className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg text-xl jiggle transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                        Start the Celebration!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
