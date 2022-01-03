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
  const [currentTurn, setCurrentTurn] = useState(null);
  const [currentWinStatus, setCurrentWinStatus] = useState("Winning");

  const sleep = (ms) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < ms);
  }

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
    setCurrentTurn("white");
    setCurrentWinStatus("Winning");
  }

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if(currentTurn === "black") {
      sleep(1000);
      let translatedBoard = [];
      let localWinStatus = currentWinStatus;
      let hasRook = false;
      for(let x of currentBoard) {
        if(x.piece === "rook") hasRook = true;
        if(x.piece === null) translatedBoard.push("");
        else if(x.piece === "knight") translatedBoard.push(`${x.color[0].toUpperCase()}${x.piece[1].toUpperCase()}`);
        else translatedBoard.push(`${x.color[0].toUpperCase()}${x.piece[0].toUpperCase()}`);
      }
      console.log(translatedBoard);
      if(!hasRook) {
        localWinStatus = "Drawn";
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "BN", "WR", "", "", "", "WN", "WK"])) {
        localWinStatus = "Drawn";
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "BN", "BR", "", "WR", "", "WN", "WK"])) {
        localWinStatus = "Drawn";
        let oldTile = currentBoard[2];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[4];
        replacedTile.piece = "rook";
        replacedTile.color = "black";
        replacedTile.src = blackrook;
        let newBoard = currentBoard;
        newBoard[2] = oldTile;
        newBoard[4] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "BN", "BR", "WR", "", "", "WN", "WK"])) {
        localWinStatus = "Losing";
        let oldTile = currentBoard[2];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[3];
        replacedTile.piece = "rook";
        replacedTile.color = "black";
        replacedTile.src = blackrook;
        let newBoard = currentBoard;
        newBoard[2] = oldTile;
        newBoard[3] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "BN", "BR", "", "WN", "WR", "", "WK"])) {
        localWinStatus = "Winning";
        let oldTile = currentBoard[1];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[3];
        replacedTile.piece = "knight";
        replacedTile.color = "black";
        replacedTile.src = blackknight;
        let newBoard = currentBoard;
        newBoard[1] = oldTile;
        newBoard[3] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "BN", "", "BR", "WN", "", "", "WK"])) {
        localWinStatus = "Lost";
        let oldTile = currentBoard[3];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[4];
        replacedTile.piece = "rook";
        replacedTile.color = "black";
        replacedTile.src = blackrook;
        let newBoard = currentBoard;
        newBoard[3] = oldTile;
        newBoard[4] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "", "WN", "BN", "", "WR", "", "WK"])) {
        localWinStatus = "Winning";
        let oldTile = currentBoard[0];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[1];
        replacedTile.piece = "king";
        replacedTile.color = "black";
        replacedTile.src = blackking;
        let newBoard = currentBoard;
        newBoard[0] = oldTile;
        newBoard[1] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["", "BK", "WN", "BN", "WR", "", "", "WK"])) {
        localWinStatus = "Winning";
        let oldTile = currentBoard[3];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[5];
        replacedTile.piece = "knight";
        replacedTile.color = "black";
        replacedTile.src = blackknight;
        let newBoard = currentBoard;
        newBoard[3] = oldTile;
        newBoard[5] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["", "BK", "WN", "", "", "WR", "", "WK"])) {
        localWinStatus = "Drawn";
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["", "BK", "WN", "WR", "", "", "", "WK"])) {
        localWinStatus = "Drawn";
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["", "BK", "WN", "", "WR", "BN", "WK", ""])) {
        localWinStatus = "Winning";
        let oldTile = currentBoard[5];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[3];
        replacedTile.piece = "knight";
        replacedTile.color = "black";
        replacedTile.src = blackknight;
        let newBoard = currentBoard;
        newBoard[5] = oldTile;
        newBoard[3] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["WN", "BK", "", "BN", "WR", "", "WK", ""])) {
        localWinStatus = "Winning";
        let oldTile = currentBoard[1];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[0];
        replacedTile.piece = "king";
        replacedTile.color = "black";
        replacedTile.src = blackking;
        let newBoard = currentBoard;
        newBoard[1] = oldTile;
        newBoard[0] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "", "", "WR", "", "", "WK", ""])) {
        localWinStatus = "Won";
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "", "BR", "BN", "WN", "", "WR", "WK"])) {
        localWinStatus = "Losing";
        let oldTile = currentBoard[2];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[1];
        replacedTile.piece = "rook";
        replacedTile.color = "black";
        replacedTile.src = blackrook;
        let newBoard = currentBoard;
        newBoard[2] = oldTile;
        newBoard[1] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "", "BR", "BN", "WN", "WR", "WK", ""])) {
        localWinStatus = "Losing";
        let oldTile = currentBoard[3];
        oldTile.color = null;
        oldTile.piece = null;
        oldTile.src = blank;
        let replacedTile = currentBoard[5];
        replacedTile.piece = "knight";
        replacedTile.color = "black";
        replacedTile.src = blackknight;
        let newBoard = currentBoard;
        newBoard[3] = oldTile;
        newBoard[5] = replacedTile;
        setCurrentBoard(newBoard);
      }
      else if(JSON.stringify(translatedBoard) === JSON.stringify(["BK", "", "BR", "", "WN", "WK", "", ""])) {
        localWinStatus = "Lost";
      }
      else {
        console.log("did not make a move!");
      }

      if(localWinStatus !== "Drawn" && localWinStatus !== "Lost" && localWinStatus !== "Won") {
        setCurrentTurn("white");     
        setCurrentWinStatus(localWinStatus);
        setCurrentBoard([...currentBoard]);
      }
      else {
        setCurrentTurn(null);
        setCurrentWinStatus(localWinStatus);
        setCurrentBoard([...currentBoard]);
      }
    }
  }, [currentTurn, currentBoard, currentWinStatus]);

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
    let inCheck = false;
    let board = currentBoard;
    let kingId = -1;
    let knightId = -1;
    for(let x in board) {
      if(board[x].piece === "king" && board[x].color === "white") kingId = parseInt(x);
      if(board[x].piece === "knight" && board[x].color === "black") knightId = parseInt(x);
    }
    if(kingId + 2 === knightId || kingId - 2 === knightId) inCheck = true;
    if(!inCheck) {
      if(draggedTile.piece === "king") {
        if(draggedId - 1 > -1 && currentBoard[draggedId - 1].color !== currentBoard[draggedId].color && draggedId - 1 !== knightId - 2 && draggedId - 1 !== knightId + 2) validMoves.push(draggedId - 1);
        if(draggedId + 1 < 8 && currentBoard[draggedId + 1].color !== currentBoard[draggedId].color && draggedId + 1 !== knightId - 2 && draggedId + 1 !== knightId + 2) validMoves.push(draggedId + 1);
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
    }
    else if(inCheck) {
      if(draggedTile.piece === "king") {
        if(draggedId - 1 > -1 && currentBoard[draggedId - 1].color !== currentBoard[draggedId].color) validMoves.push(draggedId - 1);
        if(draggedId + 1 < 8 && currentBoard[draggedId + 1].color !== currentBoard[draggedId].color) validMoves.push(draggedId + 1);
      }
      else if(draggedTile.piece === "knight") {
        if(draggedId - 2 > -1 && currentBoard[draggedId - 2].color !== currentBoard[draggedId].color && currentBoard[draggedId - 2].piece === "knight") validMoves.push(draggedId - 2);
        if(draggedId + 2 < 8 && currentBoard[draggedId + 2].color !== currentBoard[draggedId].color && currentBoard[draggedId + 2].piece === "knight") validMoves.push(draggedId + 2);
      }
      else if(draggedTile.piece === "rook") {
        let x = draggedId;
        let y = draggedId;
        
        while(x-1 > -1 && currentBoard[x-1].color === null) {
          x = x - 1;
        }
        if(x-1 > -1 && currentBoard[x-1].color !== currentBoard[draggedId].color && currentBoard[x-1].piece === "knight") validMoves.push(x-1);
        while(y+1 < 8 && currentBoard[y+1].color === null) {
          y = y + 1;
        }
        if(y+1 < 8 && currentBoard[y+1].color !== currentBoard[draggedId].color && currentBoard[y+1].piece === "knight") validMoves.push(y+1);
      }
    }

    if(validMoves.includes(replacedId)) {
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
      setCurrentTurn("black");
      setCurrentBoard([...currentBoard]);
    }
  }

  return (
    <div className='app'>
      <div>
        {currentWinStatus}
        <button onClick={createBoard}>Reset</button>
      </div>
      <div className='game'>
        {currentBoard.map((tile, index) => {
          if(tile.color === "white" && currentTurn === "white") {
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
            draggable={false}
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
