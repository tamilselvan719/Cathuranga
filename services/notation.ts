
import { BoardState, Piece, PieceType, Player, Position } from '../types';
import * as gameLogic from './gameLogic';

export const PIECE_NOTATION: { [key in PieceType]: string } = {
    [PieceType.KING]: 'K',
    [PieceType.GENERAL]: 'G',
    [PieceType.ELEPHANT]: 'E',
    [PieceType.HORSE]: 'H',
    [PieceType.CHARIOT]: 'C',
    [PieceType.PAWN]: 'P',
};

export const posToNotation = (pos: Position): string => {
    const file = String.fromCharCode('a'.charCodeAt(0) + pos.col);
    const rank = 8 - pos.row;
    return `${file}${rank}`;
};

export const getMoveNotation = (
    from: Position,
    to: Position,
    piece: Piece,
    captured: Piece | null,
    newBoard: BoardState
): string => {
    const pieceNotation = PIECE_NOTATION[piece.type];
    const fromNotation = posToNotation(from);
    const captureNotation = captured ? 'x' : '-';
    const toNotation = posToNotation(to);

    let notation = `${pieceNotation}${fromNotation}${captureNotation}${toNotation}`;

    // Promotion
    if (piece.type === PieceType.PAWN && (to.row === 0 || to.row === 7)) {
        notation += `=${PIECE_NOTATION[PieceType.GENERAL]}`;
    }

    const opponent = piece.player === Player.WHITE ? Player.BLACK : Player.WHITE;
    if (gameLogic.isCheckmate(newBoard, opponent)) {
        notation += '#';
    } else if (gameLogic.isKingInCheck(newBoard, opponent)) {
        notation += '+';
    }

    return notation;
};
