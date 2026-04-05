import { SPAWN_POSITION } from "./constants";
import { OTetromino, STetromino, ZTetromino, TTetromino, LTetromino, JTetromino, BarTetromino } from "./tetrominoes";
export const TETROMINO_TYPES = [OTetromino, STetromino, ZTetromino, TTetromino, LTetromino, JTetromino, BarTetromino];

export const createRandomTetromino = () => {
    const random = Math.floor(Math.random() * TETROMINO_TYPES.length);

    return new TETROMINO_TYPES[random](SPAWN_POSITION);
}