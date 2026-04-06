export const hasLanded = (tetromino, landedGrid) => {
    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (!tetromino.shape[row][column]) continue;

            const targetRow = row + tetromino.potentialTopLeft.down.row;
            const targetColumn = column + tetromino.potentialTopLeft.down.column;

            if (targetRow >= landedGrid.length) {
                return true;
            }

            if (landedGrid[targetRow][targetColumn].isOccupied) {
                return true;
            }
        }
    }

    return false;
};

export const canMoveHorizontally = (tetromino, landedGrid, direction) => {
    const targetPosition = tetromino.potentialTopLeft[direction];

    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (!tetromino.shape[row][column]) continue;

            const targetRow = row + targetPosition.row;
            const targetColumn = column + targetPosition.column;

            if (landedGrid[targetRow][targetColumn].isOccupied) {
                return false;
            }
        }
    }

    return true;
};

export const canMoveRight = (tetromino, landedGrid) => canMoveHorizontally(tetromino, landedGrid, 'right');

export const canMoveLeft = (tetromino, landedGrid) => canMoveHorizontally(tetromino, landedGrid, 'left');

export const canRotate = (tetromino, landedGrid) => {
    for (let row = 0; row < tetromino.potentialShape.length; row++) {
        for (let column = 0; column < tetromino.potentialShape[row].length; column++) {
            if (!tetromino.potentialShape[row][column]) continue;

            const targetRow = row + tetromino.topLeft.row;
            const targetColumn = column + tetromino.topLeft.column;

            if (landedGrid[targetRow][targetColumn].isOccupied) {
                return false;
            }
        }
    }

    return true;
};

export const isGameOver = (tetromino, landedGrid) => {
    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (!tetromino.shape[row][column]) continue;

            const targetRow = row + tetromino.topLeft.row;
            const targetColumn = column + tetromino.topLeft.column;

            if (landedGrid[targetRow][targetColumn].isOccupied) {
                return true;
            }
        }
    }

    return false;
};
