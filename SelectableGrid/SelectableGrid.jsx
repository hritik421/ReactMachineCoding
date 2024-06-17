import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const rowNumber = 10;
  const colNumber = 15;
  const grid = Array.from({ length: rowNumber * colNumber }, (_, i) => i);

  const [selectedBox, setSelectedBox] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  }

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBox([boxNumber]);
  }

  const handleMouseEnter = useCallback((boxNumber) => {
    if(isMouseDown){
      let startIndex = selectedBox[0];
      let endIndex = boxNumber;

      //find col and row number
      let firstRow = Math.floor((startIndex-1)/colNumber);
      let lastRow = Math.floor((endIndex-1)/colNumber);
      let firstCol = Math.floor((startIndex-1)%colNumber);
      let lastCol = Math.floor((endIndex-1)%colNumber);

      // Update selected box
      const selected = [];
      for(let row= Math.min(firstRow,lastRow);row<=Math.max(firstRow,lastRow);row++){
        for(let col = Math.min(firstCol,lastCol); col<= Math.max(firstCol,lastCol); col++){
          selected.push(row*colNumber + col + 1);
        }
      }
      setSelectedBox(selected);
    }
  }, [isMouseDown]);

  return (
    <div onMouseUp={handleMouseUp}
        className="grid"
        style={{"--rows": rowNumber, "--cols": colNumber}}
    >
    {
      grid.map((index) => (
        <div key={index} onMouseDown={() => handleMouseDown(index)} 
        onMouseEnter={() => handleMouseEnter(index)}
        className={`box ${selectedBox.includes(index) ? "selected" : ""}`}
        >
          {index + 1}
        </div>
      ))
    }
    </div>
  )
  
}

export default App;
