
export enum GameState {
    Login,
    Playing,
    LevelComplete,
    GameComplete,
    Slideshow,
}

export enum PieceType {
    Cupcake = 'CUPCAKE',
    GiftBox = 'GIFT_BOX',
    PartyHat = 'PARTY_HAT',
    Cookie = 'COOKIE',
    Monogram = 'MONOGRAM',
}

export enum PowerUpType {
    None = 'NONE',
    CandleV = 'CANDLE_V',
    CandleH = 'CANDLE_H',
    Popper = 'POPPER',
    Cake = 'CAKE',
}

export interface GamePiece {
    id: number;
    type: PieceType;
    powerUp: PowerUpType;
    row: number;
    col: number;
}

export type Board = (GamePiece | null)[][];

export interface LevelGoal {
    type: PieceType;
    count: number;
}

export interface Level {
    level: number;
    goals: LevelGoal[];
    moves: number;
    message: string;
}
