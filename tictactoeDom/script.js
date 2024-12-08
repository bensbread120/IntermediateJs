function createGameBoard (dimensions, defaultValue) {
  let moveCount = 0;
  let gameBoard = Array.from({ length: dimensions }, () => Array(dimensions).fill(defaultValue));
  function addSymbol (symbol, x, y) { 
    gameBoard[x][y] = symbol;
    checkWin(symbol, x, y);
    moveCount++;
  }
  function checkWin (symbol, x, y) {
    // Check horizontal
    let horz = true;
    let vert = true;
    let diag = true;
    let revDiag = true;
    
    if (moveCount == 9) {
      console.log("That's a draw");
      return false;
    }
    for (let i = 0; i < dimensions; i++) {
      // horizontal check
      if (gameBoard[x][i] != symbol) {
        horz = false;
      }
      // vertical check
      if (gameBoard[i][y] != symbol) {
        vert = false;
      }
      // Diagonal check
      if (gameBoard[i][i] != symbol) {
        diag = false;
      }
      // reverse diagonal check
      if (gameBoard[i][dimensions - i - 1] != symbol) {
        revDiag = false;
      }
    }
    if (horz) console.log(`Won by horizontal on row: ${x}`);
    if (vert) console.log(`Won by Vertical on column: ${y}`);
    if (diag) console.log("Won by diagonal.");
    if (revDiag) console.log("Won  by reverse diagonal");
    else console.log("No winners");
  }

  return {gameBoard, addSymbol, checkWin};
}



function createPlayer (name, symbol) {
  this.name = name;
  this.symbol = symbol;
  const getSymbol = () => this.symbol;
  const getName = () => this.name;
  
  return {getName, getSymbol};
}

let ben = createPlayer("Ben", "x");
let board = createGameBoard(3, "B");
board.addSymbol("b", 1, 0);
board.addSymbol("b", 2, 0);
board.addSymbol("b", 0, 0);

console.log({name: ben.getName(), symbol: ben.getSymbol()});
console.log(board.gameBoard);

