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
export const drawText = (drawingPanel, message, x, y, options = {}) => {
    drawingPanel.fillStyle = options.color ?? COLORS.text;
    drawingPanel.font = options.font ?? '20px sans-serif';
    drawingPanel.fillText(message, x, y);
};

/**
 * Draw a tetromino preview from its local shape matrix at an arbitrary canvas position.
 */
export const drawTetrominoPreview = (drawingPanel, tetromino, startX, startY) => {
    const previewBlockSize = 16;
    const previewGap = 4;
    const previewStep = previewBlockSize + previewGap;

    for (let row = 0; row < tetromino.shape.length; row++) {
        for (let column = 0; column < tetromino.shape[row].length; column++) {
            if (!tetromino.shape[row][column]) continue;

            const x = startX + column * previewStep;
            const y = startY + row * previewStep;

            drawInnerRect(drawingPanel, x + 2, y + 2, previewBlockSize - 4, previewBlockSize - 4, COLORS.block);
            drawOuterRect(drawingPanel, x, y, previewBlockSize, previewBlockSize, COLORS.block);
        }
    }
};

export const drawRoundedRect = (drawingPanel, x, y, width, height, radius, fillColor, strokeColor) => {
    drawingPanel.beginPath();
    drawingPanel.moveTo(x + radius, y);
    drawingPanel.lineTo(x + width - radius, y);
    drawingPanel.quadraticCurveTo(x + width, y, x + width, y + radius);
    drawingPanel.lineTo(x + width, y + height - radius);
    drawingPanel.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    drawingPanel.lineTo(x + radius, y + height);
    drawingPanel.quadraticCurveTo(x, y + height, x, y + height - radius);
    drawingPanel.lineTo(x, y + radius);
    drawingPanel.quadraticCurveTo(x, y, x + radius, y);
    drawingPanel.closePath();

    drawingPanel.fillStyle = fillColor;
    drawingPanel.fill();
    drawingPanel.strokeStyle = strokeColor;
    drawingPanel.stroke();
};

const drawArrowGlyph = (drawingPanel, direction, centerX, centerY, size, color) => {
    drawingPanel.beginPath();

    switch (direction) {
        case 'up':
            drawingPanel.moveTo(centerX, centerY - size);
            drawingPanel.lineTo(centerX + size, centerY + size);
            drawingPanel.lineTo(centerX - size, centerY + size);
            break;
        case 'down':
            drawingPanel.moveTo(centerX, centerY + size);
            drawingPanel.lineTo(centerX + size, centerY - size);
            drawingPanel.lineTo(centerX - size, centerY - size);
            break;
        case 'left':
            drawingPanel.moveTo(centerX - size, centerY);
            drawingPanel.lineTo(centerX + size, centerY - size);
            drawingPanel.lineTo(centerX + size, centerY + size);
            break;
        case 'right':
            drawingPanel.moveTo(centerX + size, centerY);
            drawingPanel.lineTo(centerX - size, centerY - size);
            drawingPanel.lineTo(centerX - size, centerY + size);
            break;
    }

    drawingPanel.closePath();
    drawingPanel.fillStyle = color;
    drawingPanel.fill();
};

const drawCircleButton = (drawingPanel, centerX, centerY, radius, fillColor, strokeColor, label) => {
    drawingPanel.beginPath();
    drawingPanel.arc(centerX, centerY, radius, 0, Math.PI * 2);
    drawingPanel.closePath();
    drawingPanel.fillStyle = fillColor;
    drawingPanel.fill();
    drawingPanel.strokeStyle = strokeColor;
    drawingPanel.stroke();

    drawingPanel.fillStyle = strokeColor;
    drawingPanel.font = 'bold 14px sans-serif';
    drawingPanel.textAlign = 'center';
    drawingPanel.textBaseline = 'middle';
    drawingPanel.fillText(label, centerX, centerY);
};

/**
 * Draw a classic handheld-style control layout beneath the board.
 */
export const drawControlPanel = (drawingPanel, canvasWidth, canvasHeight) => {
    const padSize = 42;
    const padGap = 8;
    const dPadCenterX = 126;
    const dPadCenterY = canvasHeight - 86;
    const dPadFill = '#c8bea6';
    const dPadStroke = '#494536';
    const actionFill = '#b84d3d';
    const actionStroke = '#5b221a';
    const actionRadius = 24;

    const directionalButtons = [
        { direction: 'up', x: dPadCenterX, y: dPadCenterY - (padSize + padGap) },
        { direction: 'left', x: dPadCenterX - (padSize + padGap), y: dPadCenterY },
        { direction: 'right', x: dPadCenterX + (padSize + padGap), y: dPadCenterY },
        { direction: 'down', x: dPadCenterX, y: dPadCenterY + (padSize + padGap) },
    ];

    directionalButtons.forEach(({ direction, x, y }) => {
        drawRoundedRect(
            drawingPanel,
            x - padSize / 2,
            y - padSize / 2,
            padSize,
            padSize,
            10,
            dPadFill,
            dPadStroke
        );
        drawArrowGlyph(drawingPanel, direction, x, y, 8, dPadStroke);
    });

    drawRoundedRect(
        drawingPanel,
        dPadCenterX - padSize / 2,
        dPadCenterY - padSize / 2,
        padSize,
        padSize,
        10,
        dPadFill,
        dPadStroke
    );

    drawCircleButton(drawingPanel, canvasWidth - 160, canvasHeight - 66, actionRadius, actionFill, actionStroke, 'A');
    drawCircleButton(drawingPanel, canvasWidth - 110, canvasHeight - 106, actionRadius, actionFill, actionStroke, 'B');

    drawingPanel.textAlign = 'start';
    drawingPanel.textBaseline = 'alphabetic';
};
