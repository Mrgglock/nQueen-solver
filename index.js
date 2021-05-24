// Set up your variable n here.
const n = 8;
// Some global variables for solve()
let solutions = [];
let numberOfSolutions = 0;
// Set up initial data for the algorithm
let directionVectors = getDirectionVectors();
let grid = getEmptyGrid(n);
// Solve it.
solve(grid, 0, 0, 0);
// Print the number of solutions.
console.log(numberOfSolutions)
// The following prints all grids of nQueen solutions.
// console.log(solutions)

/*
Given an nxn chessboard, output the number of possible ways to put n queens on the board without any one queen attacking another.

Algorithm: Backtracking
For any square we are on,
    if there are more than n queens already:
        this is invalid, stop.
    if we are on the last square:
        check if there are indeed n queens on the board. If there is, output.
    if we overflowed the column: 
        go to the next row
    choose not to place a queen:
        go to the next col, solve for the rest of the board.
    place a queen:
        if this placement is valid:
            go down 1 row, solve for the rest of the board.
        if this placement is invalid:
            don't place a queen here and move on to the next square
*/

function solve(grid, row, col, numberOfQueens) {
    if (numberOfQueens > n) return false;
    if (row == n) {
        if (numberOfQueens == n) {
            solutions.push(grid);
            numberOfSolutions++;
            return true;
        }
        return false;
    }
    if (col == n) return solve(grid, row + 1, 0, numberOfQueens);
    const currentGrid = deepClone(grid);
    solve(grid, row, col + 1, numberOfQueens);
    grid = deepClone(currentGrid);
    grid[row][col] = 'Q';
    if (isValid(grid, row, col)) solve(grid, row + 1, 0, numberOfQueens + 1);
}

function getEmptyGrid(n) {
    return new Array(n)
            .fill()
            .map(row => 
                new Array(n).fill(' ')
            );
}

function deepClone(array) {
    return JSON.parse(JSON.stringify(array));
}

/* 
    isValid: checks if 2 queens see each other.
        check for 8 direction vectors:
            move in the direction vector.
            if outofbounds, return false
            if queen found, return true
            otherwise return a recheck on next cell
*/

function isValid(grid, row, col) {
    for (const [dR, dC] of directionVectors) {
        if (hasQueen(grid, row, col, dR, dC)) return false;
    }
    return true;
}

function hasQueen(grid, row, col, dR, dC) {
    row += dR;
    col += dC;
    if (isOutOfBounds(row, col)) return false;
    if (grid[row][col] == "Q") return true;
    return hasQueen(grid, row, col, dR, dC);
}

function isOutOfBounds(row, col) {
    if (row == -1) return true;
    if (col == -1) return true;
    if (row == n) return true;
    if (col == n) return true;
    return false;
}

function getDirectionVectors() {
    let vectors = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            vectors.push([i, j]);
        }
    }
    return vectors;
}