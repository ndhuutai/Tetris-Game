export const createGrid = (rowCount, columnCount) => {
    const newArray = new Array(rowCount).fill(0);

    for (let row = 0; row < newArray.length; row++) {
        newArray[row] = new Array(columnCount);

    }
    for (let row = 0; row < newArray.length; row++) {
        for (let column = 0; column < newArray[row].length; column++) {
            newArray[row][column] = { x: 0, y: 0, isOccupied: 0 };
        }
    }
    return newArray;
}