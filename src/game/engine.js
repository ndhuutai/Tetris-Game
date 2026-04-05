import { BOARD_DIMENSIONS, SCORING } from './constants';
import { createGrid } from './createGrid';
import { createRandomTetromino } from './tetrominoQueue';
import { addRows, clearRows, getFilledRows, saveTetrominoToGrid } from './board';
import { hasLanded, isGameOver } from './collision';

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
    saveTetrominoToGrid(gameState.landedGrid, gameState.currentTetromino);

    const filledRows = getFilledRows(gameState.landedGrid);

    if (filledRows.length) {
        const clearedRowCount = clearRows(gameState.landedGrid, filledRows);
        addRows(gameState.landedGrid, clearedRowCount, BOARD_DIMENSIONS.maxColumn);
        gameState.score += clearedRowCount * SCORING.pointsPerRow;
    }

    gameState.currentTetromino = createRandomTetromino();
    gameState.isStopped = isGameOver(gameState.landedGrid);

    return gameState;
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

    gameState.currentTetromino.dropSlow();
    return gameState;
};
