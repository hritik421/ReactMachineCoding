import { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState(Array(9).fill(null));
  const [nextTurn, setNextTurn] = useState(true);

  const reset = () => {
    setBoards(Array(9).fill(null));
    setNextTurn(true);
  }

  const listWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = () => {
    for (let i = 0; i < listWinner.length; i++) {
      const [a, b, c] = listWinner[i];
      if (boards[a] && boards[a] === boards[b] && boards[a] === boards[c]) {
        return boards[a];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (checkWinner() || boards[index]) {
      return;
    }
    const newBoards = [...boards];
    newBoards[index] = nextTurn ? 'X' : 'O';
    setBoards(newBoards);
    setNextTurn(!nextTurn);
  }

  const getStatusMessage = () => {
    let winner = checkWinner();
    if (winner) {
      return `${winner} Won`;
    }
    if (!boards.includes(null)) return `It's a draw!`;
    return `Player ${nextTurn ? "X" : "O"} turn`;
  }

  return (
    <div className="game">
      <div className="status">
        <span>{getStatusMessage()}</span>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="board">
        {
          boards.map((b, index) => (
            <button key={index} className="square" onClick={() => handleClick(index)}>
              {b}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App;
