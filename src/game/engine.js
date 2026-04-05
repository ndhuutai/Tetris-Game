import { BOARD_DIMENSIONS, SCORING } from './constants';
import { createGrid } from './createGrid';
import { createRandomTetromino } from './tetrominoQueue';
import { addRows, clearRows, getFilledRows, saveTetrominoToGrid } from './board';
import { hasLanded, isGameOver } from './collision';
import { cloneTetromino } from './tetrominoes';

/**
 * Create the initial game state for a new session.
 */
export const createInitialGameState = () => ({
    landedGrid: createGrid(BOARD_DIMENSIONS.maxRow, BOARD_DIMENSIONS.maxColumn),
    currentTetromino: createRandomTetromino(),
    score: 0,
    isStopped: false,
});

/**
 * Save the active tetromino, clear any completed rows, and spawn the next piece.
 */
export const settleCurrentTetromino = (gameState) => {
    let landedGrid = saveTetrominoToGrid(gameState.landedGrid, gameState.currentTetromino);

    const filledRows = getFilledRows(landedGrid);
    let score = gameState.score;

    if (filledRows.length) {
        landedGrid = clearRows(landedGrid, filledRows);
        landedGrid = addRows(landedGrid, filledRows.length, BOARD_DIMENSIONS.maxColumn);
        score += filledRows.length * SCORING.pointsPerRow;
    }

    return {
        ...gameState,
        landedGrid,
        currentTetromino: createRandomTetromino(),
        score,
        isStopped: isGameOver(landedGrid),
    };
};

/**
 * Advance the game by one drop tick.
 */
export const tickGame = (gameState) => {
    if (gameState.isStopped) {
        return gameState;
    }

    if (hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return settleCurrentTetromino(gameState);
    }

    const currentTetromino = cloneTetromino(gameState.currentTetromino);
    currentTetromino.dropSlow();

    return {
        ...gameState,
        currentTetromino,
    };
};
