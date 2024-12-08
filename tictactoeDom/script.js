function createGame () {
  let playing = true;
  let moveCount = 0;
  let defaultValue = "D";
  let boardDims = 3;
  let currentTurn = Math.floor(Math.random() * 2); // random selection of 0 or 1
  let players = [createPlayer("Ben", "X"), createPlayer("Katrina", "O")];
  let board = createGameBoard(boardDims, defaultValue);

  function nextmove (player, x, y) {
    if (playing) {
      if (board.gameBoard[x][y] == defaultValue) {
        moveCount++;
        if (board.addSymbol(player.getSymbol(), x, y)) {
          console.log(`congratulations ${players[currentTurn].getName()}.`);
          playing = false;
        }
        else if (moveCount == 9) {
          console.log("That's a draw, Thanks for playing.");
          playing = false;
        }
        board.print();
        printBoardToWebpage();
        currentTurn = currentTurn == 0 ? 1 : 0;
      }
      else {
        console.log("That place has already been selected.")
      }
    }
    else {
      console.log("Sorry Game over. Select Reset to start again.")
    }
  }

  function printBoardToWebpage() {
    const htmlBoard = document.getElementById("gameBoard");
    htmlBoard.innerHTML = "";
    
    let x = 0;

    for (let row of board.gameBoard) {
      const tableRow = document.createElement("tr");
      let y = 0;
      for (let col of row) {
        const cell = document.createElement("td");
        const button = document.createElement("button");
        
        button.textContent = col;
        
        button.addEventListener("click", (function(x, y) {
          return function() {
              nextmove(players[currentTurn], x, y);
          };
        })(x, y));
        cell.appendChild(button);
        tableRow.appendChild(cell);
        y++;
      }
      htmlBoard.appendChild(tableRow);
      x++;
    }
  }

  function gameInit () {
    const resetbtn = document.getElementById("reset-button");
    resetbtn.addEventListener("click", function () {
      board = createGameBoard(boardDims, defaultValue);
      gameInit();
    })
    playing = true;
    moveCount = 0;
    currentTurn = Math.floor(Math.random() * 2); 
    console.log(`player ${players[currentTurn].getName()} will go first.`);
    console.log(players[1].getName());
    board.print();
    printBoardToWebpage();
  }

  return {gameInit};
}




function createGameBoard (dimensions, defaultValue) {
  let gameBoard = Array.from({ length: dimensions }, () => Array(dimensions).fill(defaultValue));

  function addSymbol (symbol, x, y) { 
      gameBoard[x][y] = symbol;
      return checkWin(symbol, x, y);
  }

  function print() {
    console.log(`${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}`);
    console.log("-----------");
    console.log(`${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}`);
    console.log("-----------");
    console.log(`${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}`);
  }

  function checkWin (symbol, x, y) {
    // Check horizontal
    let horz = true;
    let vert = true;
    let diag = true;
    let revDiag = true;

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
    if (horz || vert || diag || revDiag) {
      if (horz) console.log(`You won by horizontal on row: ${x}`);
      if (vert) console.log(`You won by Vertical on column: ${y}`);
      if (diag) console.log("You won by diagonal.");
      if (revDiag) console.log("You won  by reverse diagonal");
      return true;
    }
    return false;
  }

  return {gameBoard, print, addSymbol, checkWin};
}


function createPlayer (name, symbol) {
  const getSymbol = () => symbol;
  const getName = () => name;
  
  return {getName, getSymbol};
}

let game = createGame();
game.gameInit();
