import { createGrid } from './createGrid';

/**
 * Return all fully occupied row indexes.
 */
export const getFilledRows = (landedGrid) => {
    const filledRows = [];

    for (let row = landedGrid.length - 1; row > 1; row--) {
        if (!landedGrid[row][0]) continue;

        let isFilled = true;

        for (let column = 0; column < landedGrid[row].length; column++) {
            if (!landedGrid[row][column].isOccupied) {
                isFilled = false;
                break;
            }
        }

        if (isFilled) {
            filledRows.push(row);
        }
    }

    return filledRows;
};

/**
 * Remove the provided row indexes from the landed grid.
 * Returns how many rows were removed.
 */
export const clearRows = (landedGrid, rowIndexes) => {
    rowIndexes.forEach((rowIndex) => {
        landedGrid.splice(rowIndex, 1);
    });

    return rowIndexes.length;
};

/**
 * Add empty rows to the top of the landed grid.
 */
export const addRows = (landedGrid, count, columnCount) => {
    const newRows = createGrid(count, columnCount);

    for (let row = 0; row < newRows.length; row++) {
        landedGrid.unshift(newRows[row]);
    }
};

/**
 * Save the current tetromino shape into the landed grid.
 */
export const saveTetrominoToGrid = (landedGrid, tetromino) => {
    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (tetromino.shape[row][column]) {
                landedGrid[row + tetromino.topLeft.row][column + tetromino.topLeft.column].isOccupied =
                    tetromino.shape[row][column];
            }
        }
    }
};
