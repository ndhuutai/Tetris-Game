import { BOARD_DIMENSIONS, SCORING } from './constants';
import { createGrid } from './createGrid';
import { createRandomTetromino } from './tetrominoQueue';
import { addRows, clearRows, getFilledRows, saveTetrominoToGrid } from './board';
import { hasLanded, isGameOver } from './collision';
import { cloneTetromino } from './tetrominoes';

const logEngineEvent = (eventName, details) => {
    console.debug(`[engine] ${eventName}`, details);
};

const countOccupiedCells = (landedGrid) =>
    landedGrid.reduce(
        (occupiedCount, row) =>
            occupiedCount + row.reduce((rowCount, cell) => rowCount + (cell.isOccupied ? 1 : 0), 0),
        0
    );

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
    const settledPiece = gameState.currentTetromino.constructor.name;
    let landedGrid = saveTetrominoToGrid(gameState.landedGrid, gameState.currentTetromino);

    const filledRows = getFilledRows(landedGrid);
    let score = gameState.score;

    if (filledRows.length) {
        landedGrid = clearRows(landedGrid, filledRows);
        landedGrid = addRows(landedGrid, filledRows.length, BOARD_DIMENSIONS.maxColumn);
        score += filledRows.length * SCORING.pointsPerRow;
    }

    const currentTetromino = createRandomTetromino();

    const nextGameState = {
        ...gameState,
        landedGrid,
        currentTetromino,
        score,
        isStopped: isGameOver(currentTetromino, landedGrid),
    };

    logEngineEvent('settleCurrentTetromino', {
        settledPiece,
        clearedRows: filledRows,
        score: nextGameState.score,
        nextPiece: nextGameState.currentTetromino.constructor.name,
        nextPieceRow: nextGameState.currentTetromino.topLeft.row,
        nextPieceColumn: nextGameState.currentTetromino.topLeft.column,
        occupiedCells: countOccupiedCells(landedGrid),
        isStopped: nextGameState.isStopped,
    });

    return nextGameState;
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

/**
 * Drop the current tetromino until it lands, then settle it immediately.
 */
export const hardDropGame = (gameState) => {
    if (gameState.isStopped) {
        return gameState;
    }

    let nextGameState = gameState;
    let steps = 0;
    const maxSteps = BOARD_DIMENSIONS.maxRow + 2;

    while (!hasLanded(nextGameState.currentTetromino, nextGameState.landedGrid)) {
        if (steps >= maxSteps) {
            const error = new Error('Hard drop exceeded expected step count');
            console.error('[engine] hardDropGame aborted', {
                steps,
                maxSteps,
                currentPiece: nextGameState.currentTetromino.constructor.name,
                topLeft: nextGameState.currentTetromino.topLeft,
                error,
            });
            throw error;
        }

        nextGameState = tickGame(nextGameState);
        steps++;
    }

    logEngineEvent('hardDropGame', {
        piece: gameState.currentTetromino.constructor.name,
        steps,
        landingRow: nextGameState.currentTetromino.topLeft.row,
        landingColumn: nextGameState.currentTetromino.topLeft.column,
    });

    return settleCurrentTetromino(nextGameState);
};
