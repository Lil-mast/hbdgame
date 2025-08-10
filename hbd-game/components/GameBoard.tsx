import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Board, GamePiece, Level, PieceType, PowerUpType } from '../types';
import { ALL_PIECE_TYPES, BOARD_SIZE } from '../constants';
import GamePieceComponent from './GamePiece';

interface GameBoardProps {
    level: Level;
    onScoreUpdate: React.Dispatch<React.SetStateAction<number>>;
    onGoalUpdate: (type: PieceType, count: number) => void;
    onMove: () => void;
    isInteractable: boolean;
}

let pieceIdCounter = 0;

const GameBoard: React.FC<GameBoardProps> = ({ onScoreUpdate, onGoalUpdate, onMove, isInteractable }) => {
    const [board, setBoard] = useState<Board>([]);
    const [selectedPiece, setSelectedPiece] = useState<GamePiece | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const boardRef = useRef<HTMLDivElement>(null);

    const createPiece = (row: number, col: number, type?: PieceType): GamePiece => ({
        id: pieceIdCounter++,
        type: type || ALL_PIECE_TYPES[Math.floor(Math.random() * ALL_PIECE_TYPES.length)],
        powerUp: PowerUpType.None,
        row,
        col,
    });

    const createInitialBoard = useCallback(() => {
        let newBoard: Board = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            newBoard[row] = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                let pieceType: PieceType;
                do {
                    pieceType = ALL_PIECE_TYPES[Math.floor(Math.random() * ALL_PIECE_TYPES.length)];
                } while (
                    (col >= 2 && newBoard[row][col-1]?.type === pieceType && newBoard[row][col-2]?.type === pieceType) ||
                    (row >= 2 && newBoard[row-1][col]?.type === pieceType && newBoard[row-2][col]?.type === pieceType)
                );
                newBoard[row][col] = createPiece(row, col, pieceType);
            }
        }
        return newBoard;
    }, []);

    useEffect(() => {
        setBoard(createInitialBoard());
    }, [createInitialBoard]);

    const findMatches = useCallback((currentBoard: Board): GamePiece[][] => {
        if (currentBoard.length === 0) {
            return [];
        }
        const matches: GamePiece[][] = [];
        const checkedPieces = new Set<number>();

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                const piece = currentBoard[r][c];
                if (!piece || checkedPieces.has(piece.id)) continue;

                // Horizontal
                const hMatch = [piece];
                for (let i = c + 1; i < BOARD_SIZE; i++) {
                    if (currentBoard[r][i]?.type === piece.type) hMatch.push(currentBoard[r][i]!);
                    else break;
                }
                if (hMatch.length >= 3) {
                    matches.push(hMatch);
                    hMatch.forEach(p => checkedPieces.add(p.id));
                }

                // Vertical
                const vMatch = [piece];
                for (let i = r + 1; i < BOARD_SIZE; i++) {
                    if (currentBoard[i]?.[c]?.type === piece.type) vMatch.push(currentBoard[i][c]!);
                    else break;
                }
                if (vMatch.length >= 3) {
                     matches.push(vMatch);
                     vMatch.forEach(p => checkedPieces.add(p.id));
                }
            }
        }
        return matches;
    }, []);

    const handleGameLogic = useCallback(async (boardAfterSwap: Board) => {
        setIsProcessing(true);
        let currentBoard = boardAfterSwap;
        let changed = true;
    
        while(changed) {
            changed = false;
            
            // 1. Find and clear matches
            const matches = findMatches(currentBoard);
            if (matches.length > 0) {
                changed = true;
                let nextBoard = currentBoard.map(r => r.slice());
                let points = 0;

                for (const match of matches) {
                    points += match.length * 10;
                    onGoalUpdate(match[0].type, match.length);
                    
                    for (const piece of match) {
                        nextBoard[piece.row][piece.col] = null;
                    }
                }
                onScoreUpdate(prev => prev + points);
                currentBoard = nextBoard;
                setBoard(currentBoard);
                await new Promise(res => setTimeout(res, 300)); // Animation delay
            }
    
            // 2. Apply gravity
            let boardAfterGravity = currentBoard.map(r => r.slice());
            let fell = false;
            for (let c = 0; c < BOARD_SIZE; c++) {
                let emptyRow = BOARD_SIZE - 1;
                for (let r = BOARD_SIZE - 1; r >= 0; r--) {
                    if (boardAfterGravity[r][c]) {
                        if (emptyRow !== r) {
                            boardAfterGravity[emptyRow][c] = { ...boardAfterGravity[r][c]!, row: emptyRow };
                            boardAfterGravity[r][c] = null;
                            fell = true;
                        }
                        emptyRow--;
                    }
                }
            }
    
            if (fell) {
                changed = true;
                currentBoard = boardAfterGravity;
                setBoard(currentBoard);
                await new Promise(res => setTimeout(res, 300));
            }

            let boardAfterRefill = currentBoard.map(r => r.slice());
            let refilled = false;
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (!boardAfterRefill[r][c]) {
                        boardAfterRefill[r][c] = createPiece(r, c);
                        refilled = true;
                    }
                }
            }

            if(refilled){
                changed = true;
                currentBoard = boardAfterRefill;
                setBoard(currentBoard);
                await new Promise(res => setTimeout(res, 200));
            }
        }
        setIsProcessing(false);
    }, [findMatches, onGoalUpdate, onScoreUpdate, createPiece]);
    

    const handlePieceClick = (piece: GamePiece) => {
        if (!isInteractable || isProcessing) return;
        
        if (selectedPiece) {
            // Deselect if clicking the same piece
            if (selectedPiece.id === piece.id) {
                setSelectedPiece(null);
                return;
            }

            // Check for valid adjacent swap
            const isAdjacent = Math.abs(selectedPiece.row - piece.row) + Math.abs(selectedPiece.col - piece.col) === 1;

            if (isAdjacent) {
                // Perform swap
                const newBoard = board.map(r => r.slice());
                const temp = newBoard[selectedPiece.row][selectedPiece.col];
                newBoard[selectedPiece.row][selectedPiece.col] = { ...newBoard[piece.row][piece.col]!, row: selectedPiece.row, col: selectedPiece.col};
                newBoard[piece.row][piece.col] = { ...temp!, row: piece.row, col: piece.col };
                
                // Check if swap creates a match
                const matchesAfterSwap = findMatches(newBoard);
                if (matchesAfterSwap.length > 0) {
                    setBoard(newBoard);
                    onMove();
                    handleGameLogic(newBoard);
                } else {
                    // Invalid move, maybe add a shake animation
                }
            }
            setSelectedPiece(null);
        } else {
            setSelectedPiece(piece);
        }
    };

    return (
        <div 
            ref={boardRef}
            className="grid bg-black/30 p-2 rounded-2xl border border-white/20 shadow-lg"
            style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                width: `${BOARD_SIZE * 56}px`,
                height: `${BOARD_SIZE * 56}px`,
                cursor: isProcessing ? 'wait' : 'pointer',
            }}
        >
            {board.flat().map((piece) => piece && (
                <GamePieceComponent
                    key={piece.id}
                    piece={piece}
                    onClick={handlePieceClick}
                    isSelected={selectedPiece?.id === piece.id}
                />
            ))}
        </div>
    );
};

export default GameBoard;