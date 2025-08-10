
import React, { useMemo } from 'react';

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute rounded-full bg-white/70" style={style}></div>
);

const Sparkles: React.FC<{ count: number }> = ({ count }) => {
    const sparkles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => {
            const size = Math.random() * 5 + 2;
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 5;
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;

            const animationName = `drift-${i}`;
            const keyframes = `
                @keyframes ${animationName} {
                    0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 1; }
                    100% { transform: translateY(-150px) translateX(${Math.random() * 100 - 50}px) scale(0); opacity: 0; }
                }
            `;

            return (
                <React.Fragment key={i}>
                    <style>{keyframes}</style>
                    <Sparkle
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            top,
                            left,
                            animation: `${animationName} ${duration}s ${delay}s linear infinite`,
                        }}
                    />
                </React.Fragment>
            );
        });
    }, [count]);

    return <div className="absolute inset-0 pointer-events-none">{sparkles}</div>;
};

export default Sparkles;
