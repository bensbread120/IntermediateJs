function createGame () {
  let playing = true;
  let moveCount = 0;
  let defaultValue = "-";
  let boardDims = 3;
  let currentTurn = Math.floor(Math.random() * 2); // random selection of 0 or 1
  let players = [createPlayer("Ben", "X"), createPlayer("Katrina", "O")];
  let board = createGameBoard(boardDims, defaultValue);
  let gameText = document.getElementById("game-text");

  function nextmove (player, x, y) {
    if (playing) {
      gameText.textContent = "     ";
      if (board.gameBoard[x][y] == defaultValue) {
        moveCount++;
        let winText = board.addSymbol(player.getSymbol(), x, y);
        if (winText) {
          gameText.textContent = `${winText}. congratulations ${players[currentTurn].getName()}.`;
          playing = false;
        }
        else if (moveCount == boardDims * boardDims) {
          gameText.textContent = "That's a draw, Thanks for playing.";
          playing = false;
        }
        board.print();
        printBoardToWebpage();
        currentTurn = currentTurn == 0 ? 1 : 0;
        if (playing) {
          gameText.textContent = `Nice move, now it's ${players[currentTurn].getName()}'s turn.`;
        }
      }
      else {
        gameText.textContent = "That place has already been selected.";
      }
    }
    else {
      gameText.textContent = "Sorry Game over. Select Reset to start again.";
    }
  }

  function printBoardToWebpage() {
    const htmlBoard = document.getElementById("game-board");
    htmlBoard.innerHTML = "";
    
    let x = 0;

    for (let row of board.gameBoard) {
      let y = 0;
      for (let col of row) {
        const cell = document.createElement("button");
        cell.className = "board-cell";
        cell.textContent = col;
        cell.addEventListener("click", (function(x, y) {
          return function() {
              nextmove(players[currentTurn], x, y);
          };
        })(x, y));
      
        htmlBoard.appendChild(cell);
        y++;
      }
      x++;
    }
  }

  function gameInit () {
    const resetbtn = document.getElementById("reset-button");
    resetbtn.addEventListener("click", function () {
      board = createGameBoard(boardDims, defaultValue);
      gameText.textContent = "";
      gameInit();
    })
    players[0].setName(prompt("Please enter name for Player one:"));
    players[1].setName(prompt("Please enter name for player two:"));
    playing = true;
    moveCount = 0;
    currentTurn = Math.floor(Math.random() * 2); 
    gameText.textContent = `player ${players[currentTurn].getName()} will go first.`;
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
    if (horz) return `You won by horizontal on row: ${x}`;
    if (vert) return `You won by Vertical on column: ${y}`;
    if (diag) return "You won by diagonal.";
    if (revDiag) return "You won  by reverse diagonal";
    return "";
  }

  return {gameBoard, print, addSymbol, checkWin};
}


function createPlayer (name, symbol) {
  const getSymbol = () => symbol;
  const getName = () => name;
  const setName = (newName) => name = newName;
  
  return {getName, setName, getSymbol};
}

let game = createGame();
game.gameInit();
