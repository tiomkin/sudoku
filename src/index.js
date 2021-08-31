module.exports = function solveSudoku(matrix) {
  solve(matrix);

  return matrix;

}
function checkCanInsert(number, position, matrix) {
  let smallBoxSize = Math.sqrt(matrix.length);
  const [row,column] = position;

  // Check if number exists on the same column
  for (let i = 0; i < matrix.length; i++) {
    if (i === row) continue;

    if (matrix[i][column] === number) {
      return false;
    }
  }

  // Check if number exists on the same row
  for (let i = 0; i < matrix.length; i++) {
    if (i === column) continue;

    if (matrix[row][i] === number) {
      return false;
    }
  }

  let rowForStartSection = Math.floor(row / smallBoxSize) * smallBoxSize;
  let columnForStartSection = Math.floor(column / smallBoxSize) * smallBoxSize;

  for (let i = rowForStartSection; i < rowForStartSection + smallBoxSize; i++) {
    if (i === row) continue;
    for (let j = columnForStartSection; j < columnForStartSection + smallBoxSize; j++) {
      if (j === column) continue;

      if (matrix[i][j] === number) {
        return false;
      }
    }
  }

  return true;
}

function solve(matrix) {
  // Try to find empty cell
  const currentCell = findEmptyCell(matrix);

  // If there is no empty cell - sudoku is solved
  if (!currentCell) {
    return true;
  }

  for (let i = 1; i <= matrix.length; i++) {
    const currentNumber = i;
    const canInsertNumber = checkCanInsert(currentNumber, currentCell, matrix);

    if (canInsertNumber) {
      const [row,column] = currentCell;
      matrix[row][column] = currentNumber;

      if (solve(matrix)) {
        return true;
      }

      matrix[row][column] = 0;
    }
  }

  return false;
}

function findEmptyCell(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 0) {
        return [i,j];
      }
    }
  }

  return null;
}
