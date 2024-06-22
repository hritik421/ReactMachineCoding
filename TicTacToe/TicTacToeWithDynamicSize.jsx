import './App.css';
import { useState } from 'react';

export default function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(new Array(boardSize * boardSize).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const generateWinningCombinations = (size) => {
    const combinations = [];

    // Rows
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      combinations.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(i + j * size);
      }
      combinations.push(col);
    }

    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - i - 1));
    }
    combinations.push(diag1);
    combinations.push(diag2);

    return combinations;
  };

  const [winner, setWinner] = useState(generateWinningCombinations(boardSize));

  const handleReset = () => {
    setXTurn(true);
    setBoard(new Array(boardSize * boardSize).fill(null));
  };

  const checkWinner = () => {
    for (let i = 0; i < winner.length; i++) {
      const combination = winner[i];
      const [a, ...rest] = combination;
      if (board[a] && rest.every(index => board[index] === board[a])) {
        return board[a];
      }
    }
    return null;
  };

  const updateBox = (index) => {
    if (checkWinner() || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setXTurn(!xTurn);
    setBoard(newBoard);
  };

  const getStatus = () => {
    let winner = checkWinner();
    if (winner) {
      return `Player ${winner} is the winner`;
    }
    if (!board.includes(null)) return "It's a draw";
    return `Player ${xTurn ? 'X' : 'O'}'s turn`;
  };

  const handleBoardSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    if (newSize >= 3) {
      setBoardSize(newSize);
      setBoard(new Array(newSize * newSize).fill(null));
      setWinner(generateWinningCombinations(newSize));
      setXTurn(true);
    }
  };

  return (
    <div className='container'>
      <div className='settings'>
        <label>
          Board Size:
          <input type="number" value={boardSize} onChange={handleBoardSizeChange} min="3" />
        </label>
      </div>
      <div className='status'>
        <span>{getStatus()}</span>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className='board' style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
        {board.map((item, ind) => (
          <button className='square' key={ind} onClick={() => updateBox(ind)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
