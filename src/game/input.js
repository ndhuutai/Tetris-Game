import { INPUT_KEYS, TIMINGS } from './constants';
import { canMoveLeft, canMoveRight, canRotate, hasLanded } from './collision';

/**
 * Track input-driven timing without owning the actual timer.
 */
export const createInitialInputState = () => ({
    frameRate: TIMINGS.defaultFrameRate,
});

export const moveTetrominoLeft = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    if (!canMoveLeft(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    gameState.currentTetromino.moveLeft();
    return true;
};

export const moveTetrominoRight = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    if (!canMoveRight(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    gameState.currentTetromino.moveRight();
    return true;
};

export const rotateTetromino = (gameState) => {
    if (gameState.isStopped || hasLanded(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    if (!canRotate(gameState.currentTetromino, gameState.landedGrid)) {
        return false;
    }

    gameState.currentTetromino.rotate();
    return true;
};

/**
 * Apply keyboard press behavior and return timer hints for the caller.
 */
export const handleKeyDown = (key, gameState, inputState) => {
    let shouldTick = false;

    switch (key) {
        case INPUT_KEYS.spacebar:
            inputState.frameRate = TIMINGS.hardDropFrameRate;
            shouldTick = !gameState.isStopped;
            break;
        case INPUT_KEYS.arrowDown:
            inputState.frameRate = TIMINGS.softDropFrameRate;
            shouldTick = !gameState.isStopped;
            break;
        case INPUT_KEYS.arrowUp:
            rotateTetromino(gameState);
            break;
        case INPUT_KEYS.arrowLeft:
            moveTetrominoLeft(gameState);
            break;
        case INPUT_KEYS.arrowRight:
            moveTetrominoRight(gameState);
            break;
    }

    return { gameState, inputState, shouldTick };
};

/**
 * Apply keyboard release behavior and return timer hints for the caller.
 */
export const handleKeyUp = (key, gameState, inputState) => {
    let shouldTick = false;

    switch (key) {
        case INPUT_KEYS.spacebar:
            inputState.frameRate = TIMINGS.defaultFrameRate;
            shouldTick = !gameState.isStopped;
            break;
        case INPUT_KEYS.arrowDown:
            inputState.frameRate = TIMINGS.releaseDownFrameRate;
            shouldTick = !gameState.isStopped;
            break;
    }

    return { gameState, inputState, shouldTick };
};
