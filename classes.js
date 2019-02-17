class Tetromino {
    constructor(topLeft) {
        if(new.target === Tetromino) {
            throw new TypeError('Cannot construct Tetromino directly. Please instantiate with one of its subclasses');
        }
        this._potentialTopLeft = {down: {row: topLeft.row + 1, column: topLeft.column}, right: {row: topLeft.row, column: topLeft.column +1}, left:{row: topLeft.row, column: topLeft.column -1}};
        this._topLeft = topLeft;

        this._currentShapeIndex = 0;
        this._potentialShapeIndex = 1;
    }

    get shape() {
        throw new Error('You must implement getter for shape');
    }

    set shape(shape) {
        throw new Error('You must implement setter for shape');
    }

    get potentialShape() {
        throw new Error('You must implement getter for shape');
    }

    set potentialShape(shape) {
        throw new Error('You must implement setter for shape');
    }

    get topLeft() {
        return this._topLeft;
    }

    set topLeft(topLeft) {
        this._topLeft = topLeft;
    }

    get potentialTopLeft() {
        return this._potentialTopLeft;
    }

    set potentialTopLeft(potentialTopLeft) {
        this._potentialTopLeft = potentialTopLeft;
    }

    moveLeft() {
        this._topLeft.column--;
        //update the potential of left, right, and down(below) of the tetromino
        this._potentialTopLeft.down.column--;
        this._potentialTopLeft.right.column--;
        this._potentialTopLeft.left.column--;
    }

    moveRight() {
        this._topLeft.column++;
        //update the potential of left, right, and down(below) of the tetromino
        this._potentialTopLeft.down.column++;
        this._potentialTopLeft.right.column++;
        this._potentialTopLeft.left.column++;
    }


    dropSlow() {
        this._topLeft.row++;
        this._potentialTopLeft.down.row++;
        this._potentialTopLeft.right.row++;
        this._potentialTopLeft.left.row++;
    }

    rotate() {
        throw new Error('You must implement rotate method')
    }
}

class OTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
          [1,1],
          [1,1]
        ];

        this._shape = this._rotatedShape;
        this._potentialShape = this._rotatedShape;
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        //Doesn't need to rotate
    }
}

class LTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
          [
              [0,0,1],
              [1,1,1]
          ],
            [
                [1,1],
                [0,1],
                [0,1]
            ],
            [
                [1,1,1],
                [1,0,0]
            ],
            [
                [1,0],
                [1,0],
                [1,1]
            ]
        ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class JTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [  [   [1,0,0],
                                    [1,1,1],
                                ] ,
                                [   [0,1],
                                    [0,1],
                                    [1,1]
                                ] ,
                                [   [1,1,1],
                                    [0,0,1]
                                ] ,
                                [   [1,1],
                                    [1,0],
                                    [1,0]
                                ] ,
                             ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class ZTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
          [
              [1,1,0],
              [0,1,1]
          ],
          [
              [0,1],
              [1,1],
              [1,0]
          ]
        ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class STetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
            [
                [0,1,1],
                [1,1,0]
            ],
            [
                [1,0],
                [1,1],
                [0,1]
            ]
        ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class TTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
            [
                [0,1,0],
                [1,1,1]
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ],
            [
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ]
        ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class BarTetromino extends Tetromino {
    constructor(topLeft) {
        super(topLeft);
        this._rotatedShape = [
            [
                [1,1,1,1]
            ],
            [
                [1],
                [1],
                [1],
                [1]
            ]
        ];

        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get potentialShape() {
        return this._potentialShape;
    }

    set potentialShape(shape) {
        this._potentialShape = shape;
    }

    rotate() {
        this._currentShapeIndex++;
        this._potentialShapeIndex++;
        if(this._currentShapeIndex === this._rotatedShape.length) {
            this._currentShapeIndex = 0;
        }
        if(this._potentialShapeIndex === this._rotatedShape.length) {
            this._potentialShapeIndex = 0;
        }
        this._shape = this._rotatedShape[this._currentShapeIndex];
        this._potentialShape = this._rotatedShape[this._potentialShapeIndex];
    }
}

class BlockInfo {
    constructor(x, y, isOccupied) {
        this.x = x;
        this.y = y;
        this.isOccupied = isOccupied;
    }

    get xPosition() {
        return this.x;
    }

    set xPosition(x) {
        this.x = x;
    }

    get yPosition() {
        return this.y;
    }

    set yPosition(y) {
        this.y = y;
    }

    get occupiedStatus() {
        return this.isOccupied;
    }

    set occupiedStatus(isOccupied) {
        this.isOccupied = isOccupied;
    }
}