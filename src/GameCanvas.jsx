import { useEffect, useRef } from 'react';
import { BOARD_DIMENSIONS, BLOCK_SIZES, COLORS } from './game/constants';
import {
    drawBackground,
    drawBackgroundBlocks,
    drawLandedBlocks,
    drawTetromino,
} from './game/render';

function GameCanvas({ gameState }) {
    const canvasRef = useRef(null);

    // Derive canvas and board layout dimensions.
    const canvasWidth = 551;
    const canvasHeight = 640;

    const boardWidth =
        BLOCK_SIZES.outerBlockWidthWithPadding * BOARD_DIMENSIONS.maxBackgroundColumn;

    const boardHeight =
        BLOCK_SIZES.outerBlockHeightWithPadding * BOARD_DIMENSIONS.maxBackgroundRow;

    const offsetToCanvasTop = BLOCK_SIZES.outerBlockHeightWithPadding * 3;
    const offsetToCanvasLeft = canvasWidth / 2 - boardWidth / 2;
    const offsetToBackgroundTop =
        offsetToCanvasTop -
        BLOCK_SIZES.innerBlockHeight * 3 +
        BLOCK_SIZES.innerBlockPadding * 2;
    const offsetToBackgroundLeft = offsetToCanvasLeft + 10;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const drawingPanel = canvas.getContext('2d');
        if (!drawingPanel) return;

        // Clear and repaint the full canvas background.
        drawingPanel.fillStyle = COLORS.canvasBackground;
        drawingPanel.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw the board shell.
        drawBackground(
            drawingPanel,
            offsetToCanvasLeft,
            offsetToCanvasTop,
            boardWidth,
            boardHeight
        );

        // Draw background cells and cache board-cell pixel positions.
        drawBackgroundBlocks(
            drawingPanel,
            gameState.landedGrid,
            offsetToBackgroundLeft,
            offsetToBackgroundTop
        );

        // Draw landed blocks already stored in the board.
        drawLandedBlocks(drawingPanel, gameState.landedGrid);

        // Draw the active falling piece.
        drawTetromino(drawingPanel, gameState.currentTetromino, gameState.landedGrid);

        // Optional:
        // draw score or game-over text onto the canvas here if you want that inside
        // the canvas rather than in GameHud.
    }, [gameState]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
        />
    );
}

export default GameCanvas;
