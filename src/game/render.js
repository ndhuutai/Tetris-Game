import { BLOCK_SIZES, COLORS } from './constants';

export const drawInnerRect = (drawingPanel, x, y, width, height, color) => {
    drawingPanel.fillStyle = color;
    drawingPanel.fillRect(x, y, width, height);
};

export const drawOuterRect = (drawingPanel, x, y, width, height, color) => {
    drawingPanel.strokeStyle = color;
    drawingPanel.strokeRect(x, y, width, height);
};

export const drawSingleBlock = (drawingPanel, x, y, color) => {
    drawInnerRect(
        drawingPanel,
        x + BLOCK_SIZES.innerBlockPadding,
        y + BLOCK_SIZES.innerBlockPadding,
        BLOCK_SIZES.innerBlockWidth,
        BLOCK_SIZES.innerBlockHeight,
        color
    );
    drawOuterRect(drawingPanel, x, y, BLOCK_SIZES.outerBlockWidth, BLOCK_SIZES.outerBlockHeight, color);
};

/**
 * Draw the outer board background panel.
 */
export const drawBackground = (drawingPanel, offSetX, offSetY, width, height) => {
    drawInnerRect(drawingPanel, offSetX, offSetY, width, height, COLORS.boardBackgroundFill);
    drawOuterRect(drawingPanel, offSetX, offSetY, width, height, COLORS.boardBackgroundStroke);
};

/**
 * Draw the background grid cells and cache each cell's canvas coordinates on the board.
 */
export const drawBackgroundBlocks = (drawingPanel, landedGrid, offSetX, offSetY) => {
    for (let row = 2; row < landedGrid.length; row++) {
        for (let column = 0; column < landedGrid[row].length; column++) {
            const x = column * BLOCK_SIZES.outerBlockWidthWithPadding + offSetX;
            const y = row * BLOCK_SIZES.outerBlockHeightWithPadding + offSetY;

            drawSingleBlock(drawingPanel, x, y, COLORS.boardCell);
            landedGrid[row][column].x = x;
            landedGrid[row][column].y = y;
        }
    }
};

/**
 * Draw all settled blocks already saved into the landed grid.
 */
export const drawLandedBlocks = (drawingPanel, landedGrid) => {
    for (let row = 0; row < landedGrid.length; row++) {
        for (let column = 0; column < landedGrid[row].length; column++) {
            if (landedGrid[row][column].isOccupied) {
                drawSingleBlock(drawingPanel, landedGrid[row][column].x, landedGrid[row][column].y, COLORS.block);
            }
        }
    }
};

/**
 * Draw the active falling tetromino using the board cell coordinates as anchors.
 */
export const drawTetromino = (drawingPanel, tetromino, landedGrid) => {
    for (let row = 0; row < tetromino.shape.length; row++) {
        const tetrominoRowPosition = row + tetromino.topLeft.row;

        if (tetrominoRowPosition === 1) continue;

        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (!tetromino.shape[row][column]) continue;

            const tetrominoColumnPosition = column + tetromino.topLeft.column;
            const targetCell = landedGrid[tetrominoRowPosition]?.[tetrominoColumnPosition];

            if (targetCell?.x) {
                drawSingleBlock(drawingPanel, targetCell.x, targetCell.y, COLORS.block);
            }
        }
    }
};

/**
 * Draw a text label onto the canvas.
 */
export const drawText = (drawingPanel, message, x, y) => {
    drawingPanel.fillStyle = COLORS.text;
    drawingPanel.font = '20px sans-serif';
    drawingPanel.fillText(message, x, y);
};
