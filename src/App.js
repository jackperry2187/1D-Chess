import { useEffect, useState } from 'react';
import whiteking from './images/white_king.png';
import whiteknight from './images/white_knight.png';
import whiterook from './images/white_rook.png';
import blackking from './images/black_king.png';
import blackknight from './images/black_knight.png';
import blackrook from './images/black_rook.png';
import blank from './images/blank.png';

const App = () => {
  const [currentBoard, setCurrentBoard] = useState([]);
  const [tileBeingDragged, setTileBeingDragged] = useState(null);
  const [tileBeingReplaced, setTileBeingReplaced] = useState(null);

  const createBoard = () => {
    let initialArray = [];
    let tile1 = {
      piece: "king",
      color: "black",
      tileColor: "white",
      src: blackking
    }
    let tile2 = {
      piece: "knight",
      color: "black",
      tileColor: "black",
      src: blackknight
    }
    let tile3 = {
      piece: "rook",
      color: "black",
      tileColor: "white",
      src: blackrook
    }
    let tile4 = {
      piece: null,
      color: null,
      tileColor: "black",
      src: blank
    }
    let tile5 = {
      piece: null,
      color: null,
      tileColor: "white",
      src: blank
    }
    let tile6 = {
      piece: "rook",
      color: "white",
      tileColor: "black",
      src: whiterook
    }
    let tile7 = {
      piece: "knight",
      color: "white",
      tileColor: "white",
      src: whiteknight
    }
    let tile8 = {
      piece: "king",
      color: "white",
      tileColor: "black",
      src: whiteking
    }
    initialArray.push(tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8);
    setCurrentBoard(initialArray);
  }

  useEffect(() => {
    createBoard();
  }, []);

  const dragStart = (e) => {
    setTileBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    setTileBeingReplaced(e.target);
  }

  const dragEnd = () => {
    if(tileBeingDragged == null || tileBeingReplaced == null) return;
    const replacedId = parseInt(tileBeingReplaced.getAttribute('data-id'));
    const draggedId = parseInt(tileBeingDragged.getAttribute('data-id'));
    let replacedTile = currentBoard[replacedId];
    let draggedTile = currentBoard[draggedId];
    let validMoves = [];
    
    if(draggedTile.piece === "king") {
      if(draggedId - 1 > -1 && currentBoard[draggedId - 1].color !== currentBoard[draggedId].color) validMoves.push(draggedId - 1);
      if(draggedId + 1 < 8 && currentBoard[draggedId + 1].color !== currentBoard[draggedId].color) validMoves.push(draggedId + 1);
    }
    else if(draggedTile.piece === "knight") {
      if(draggedId - 2 > -1 && currentBoard[draggedId - 2].color !== currentBoard[draggedId].color) validMoves.push(draggedId - 2);
      if(draggedId + 2 < 8 && currentBoard[draggedId + 2].color !== currentBoard[draggedId].color) validMoves.push(draggedId + 2);
    }
    else if(draggedTile.piece === "rook") {
      let x = draggedId;
      let y = draggedId;
      
      while(x-1 > -1 && currentBoard[x-1].color === null) {
        validMoves.push(x-1);
        x = x - 1;
      }
      if(x-1 > -1 && currentBoard[x-1].color !== currentBoard[draggedId].color) validMoves.push(x-1);
      while(y+1 < 8 && currentBoard[y+1].color === null) {
        validMoves.push(y+1);
        y = y + 1;
      }
      if(y+1 < 8 && currentBoard[y+1].color !== currentBoard[draggedId].color) validMoves.push(y+1);
    }
    if(validMoves.includes(replacedId)) {
      console.log("Valid move!");
      let newColor = draggedTile.color;
      let newPiece = draggedTile.piece;
      let newSrc  = draggedTile.src;
      draggedTile.color = null;
      draggedTile.piece = null;
      draggedTile.src = blank;
      replacedTile.piece = newPiece;
      replacedTile.color = newColor;
      replacedTile.src = newSrc;
      let newBoard = currentBoard;
      newBoard[draggedId] = draggedTile;
      newBoard[replacedId] = replacedTile;
      setCurrentBoard(newBoard);
      setCurrentBoard([...currentBoard]);
    }
    else {
      console.log("Invalid move!");
    }
  }

  return (
    <div className='app'>
      <div className='game'>
        {currentBoard.map((tile, index) => {
          if(tile.color === "white") {
            return <img
            key={index}
            style={{backgroundColor: tile.tileColor}}
            alt={`${tile.color} ${tile.piece} ${index}`}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            src={tile.src}
          />
          }
          return <img
            key={index}
            style={{backgroundColor: tile.tileColor}}
            alt={`${tile.color} ${tile.piece} ${index}`}
            data-id={index}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            src={tile.src}
          />
        })}
      </div>
    </div>
  );
}

export default App;
