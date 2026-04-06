export const INPUT_KEYS = {
    spacebar: ' ',
    arrowUp: 'ArrowUp',
    arrowDown: 'ArrowDown',
    arrowLeft: 'ArrowLeft',
    arrowRight: 'ArrowRight',
}

export const TIMINGS = {
    defaultFrameRate: 1000,
    releaseDownFrameRate: 500,
    softDropFrameRate: 50,
    hardDropFrameRate: 5,
};


export const BOARD_DIMENSIONS = {
    maxBackgroundRow: 21,
    maxBackgroundColumn: 17,
    maxRow: 22,
    maxColumn: 10
}

const INNER_BLOCK_WIDTH = 10;
const INNER_BLOCK_HEIGHT = 10;
const INNER_BLOCK_PADDING = 2;
const OUTER_BLOCK_PADDING = 4;
const OUTER_BLOCK_WIDTH = INNER_BLOCK_WIDTH + INNER_BLOCK_PADDING * 2;
const OUTER_BLOCK_HEIGHT = INNER_BLOCK_HEIGHT + INNER_BLOCK_PADDING * 2;
const OUTER_BLOCK_WIDTH_WITH_PADDING = OUTER_BLOCK_WIDTH + OUTER_BLOCK_PADDING;
const OUTER_BLOCK_HEIGHT_WITH_PADDING = OUTER_BLOCK_HEIGHT + OUTER_BLOCK_PADDING;

export const BLOCK_SIZES = {
    innerBlockWidth: INNER_BLOCK_WIDTH,
    innerBlockHeight: INNER_BLOCK_HEIGHT,
    innerBlockPadding: INNER_BLOCK_PADDING,
    outerBlockPadding: OUTER_BLOCK_PADDING,
    outerBlockHeight: OUTER_BLOCK_HEIGHT,
    outerBlockWidth: OUTER_BLOCK_WIDTH,
    outerBlockWidthWithPadding: OUTER_BLOCK_WIDTH_WITH_PADDING,
    outerBlockHeightWithPadding: OUTER_BLOCK_HEIGHT_WITH_PADDING
}

export const COLORS = {
    canvasBackground: '#efcc19',
    block: '#000',
    boardCell: 'rgb(135,147,114)',
    boardBackgroundFill: '#9ead86',
    boardBackgroundStroke: '#494536',
    text: 'black',
};


export const SPAWN_POSITION = {
    row: 2,
    column: 4,
};

export const SCORING = {
    pointsPerRow: 100,
};
