import { INPUT_KEYS, TIMINGS } from './constants';
import { canMoveLeft, canMoveRight, canRotate, hasLanded } from './collision';
import { cloneTetromino } from './tetrominoes';
import { hardDropGame } from './engine';

/**
 * Track input-driven timing without owning the actual timer.
 */
export const createInitialInputState = () => ({
    frameRate: TIMINGS.defaultFrameRate,
});

export const moveTetrominoLeft = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    if (!canMoveLeft(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    const currentTetromino = cloneTetromino(gameState.currentTetromino);
    currentTetromino.moveLeft();

    return {
        ...gameState,
        currentTetromino,
    };
};

export const moveTetrominoRight = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    if (!canMoveRight(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    const currentTetromino = cloneTetromino(gameState.currentTetromino);
    currentTetromino.moveRight();

    return {
        ...gameState,
        currentTetromino,
    };
};

export const rotateTetromino = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    if (!canRotate(gameState.currentTetromino, gameState.landedGrid)) {
        return gameState;
    }

    const currentTetromino = cloneTetromino(gameState.currentTetromino);
    currentTetromino.rotate();

    return {
        ...gameState,
        currentTetromino,
    };
};

/**
 * Apply keyboard press behavior and return timer hints for the caller.
 */
export const handleKeyDown = (key, gameState, inputState) => {
    let shouldTick = false;
    let nextGameState = gameState;
    let nextInputState = inputState;

    switch (key) {
        case INPUT_KEYS.spacebar:
            nextGameState = hardDropGame(gameState);
            break;
        case INPUT_KEYS.arrowDown:
            nextInputState = {
                ...inputState,
                frameRate: TIMINGS.softDropFrameRate,
            };
            shouldTick = !gameState.isStopped;
            break;
        case INPUT_KEYS.arrowUp:
            nextGameState = rotateTetromino(gameState);
            break;
        case INPUT_KEYS.arrowLeft:
            nextGameState = moveTetrominoLeft(gameState);
            break;
        case INPUT_KEYS.arrowRight:
            nextGameState = moveTetrominoRight(gameState);
            break;
    }

    return { gameState: nextGameState, inputState: nextInputState, shouldTick };
};

/**
 * Apply keyboard release behavior and return timer hints for the caller.
 */
export const handleKeyUp = (key, gameState, inputState) => {
    let shouldTick = false;
    let nextInputState = inputState;

    switch (key) {
        case INPUT_KEYS.arrowDown:
            nextInputState = {
                ...inputState,
                frameRate: TIMINGS.releaseDownFrameRate,
            };
            break;
    }

    return { gameState, inputState: nextInputState, shouldTick };
};
