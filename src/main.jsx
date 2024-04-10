import ReactDOM from 'react-dom/client'
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}


function Square(props) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={() => props.handleTileClick()}
    >

      {props.content}
    </div>
  );
}

function Board() {
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])
  const [piece, setPiece] = useState('X')
  const [win, setWin] = useState('')

  const resetBoard = () => {
    setBoard([['', '', ''], ['', '', ''], ['', '', '']])
    setPiece('X')
    setWin('')
  }

  const playPiece = (x, y) => {
    if (!board[y][x] && !win) {

      const tmpBoard = [...board]
      tmpBoard[y][x] = piece

      setBoard(tmpBoard)
      setPiece(piece === 'X' ? 'O' : 'X')

      // check win

      // horizontal win
      const horizontalWin = board[y].join('')
      if (['XXX', 'OOO'].includes(horizontalWin)) {
        setWin(piece === 'X' ? 'X' : 'O')
        return
      }

      // vertical win
      const verticalWin = tmpBoard.map((row) => row[x]).join('')

      if (['XXX', 'OOO'].includes(verticalWin)) {
        setWin(piece === 'X' ? 'X' : 'O')
        return
      }


      // diagonal win
      const diagonalWin = tmpBoard[0][0] + tmpBoard[1][1] + tmpBoard[2][2] + ' ' + tmpBoard[0][2] + tmpBoard[1][1] + tmpBoard[2][0]
      if (diagonalWin.includes('XXX') || diagonalWin.includes('OOO')) {
        setWin(piece === 'X' ? 'X' : 'O')
        return
      }
    }
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{piece}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{win}</span></div>
      <button style={buttonStyle} onClick={() => resetBoard()} >Reset</button>
      <div style={boardStyle}>
        {
          board.map((row, yIndex) => {
            return (
              <div key={`${yIndex}_y`} className="board-row" style={rowStyle}>
                {row.map((item, xIndex) => { return (<div > <Square handleTileClick={() => playPiece(xIndex, yIndex)} content={item} key={`${yIndex}_y_${xIndex}_x`} /> </div>) })}
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Game />
)


