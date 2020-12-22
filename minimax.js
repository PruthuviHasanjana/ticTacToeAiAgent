
function bestNextMove() {
 
  let bestMark = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
     
      if (board[i][j] == '') {
        board[i][j] = aiPlayer;
        let mark = minimax(board, 0, false);
        board[i][j] = '';
        if (mark > bestMark) {
          bestMark = mark;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = aiPlayer;
  currentPlayer = humanPlayer;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = isWin();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = aiPlayer;
          let score = minimax(board, depth + 1, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = humanPlayer;
          let score = minimax(board, depth + 1, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}