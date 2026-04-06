import { createGrid } from './createGrid';

const cloneCell = (cell) => ({
    x: cell.x,
    y: cell.y,
    isOccupied: cell.isOccupied,
});

export const cloneGrid = (landedGrid) => landedGrid.map((row) => row.map(cloneCell));

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
    const rowIndexSet = new Set(rowIndexes);
    return landedGrid
        .filter((_, rowIndex) => !rowIndexSet.has(rowIndex))
        .map((row) => row.map(cloneCell));
};

/**
 * Add empty rows to the top of the landed grid.
 */
export const addRows = (landedGrid, count, columnCount) => {
    const newRows = createGrid(count, columnCount);
    return [...newRows, ...landedGrid.map((row) => row.map(cloneCell))];
};

/**
 * Save the current tetromino shape into the landed grid.
 */
export const saveTetrominoToGrid = (landedGrid, tetromino) => {
    const nextGrid = cloneGrid(landedGrid);

    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (tetromino.shape[row][column]) {
                nextGrid[row + tetromino.topLeft.row][column + tetromino.topLeft.column].isOccupied =
                    tetromino.shape[row][column];
            }
        }
    }

    return nextGrid;
};
