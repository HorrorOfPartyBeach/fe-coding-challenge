import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell, resetGame } from '../../store/actions/moves';
import {BoardCell} from "../boardcell/BoardCell";

const selectBoard = (state) => state.board;
const selectGame = (state) => state.game;

const getRandomCell = (i) => Math.floor(Math.random() * i)

// const checkForWinner = (cells) => {
//   const possibleWins = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ]

//   for (let i = 0; i < possibleWins.length; i++) {
//     const [a, b, c] = possibleWins[i];
//     if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
//       return cells[a];
//     }
//   }
//   return null;
// }

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  return (
    <div className="Board">
    <h1 style={{textAlign: 'center'}}>Tic Tac Toe Board</h1>
      <div className="board-background" style={{textAlign: 'center'}}>{board.map((row, rowIndex) => {
          return <div className="board-row" key={rowIndex}>{row.map((cell, cellIndex) => {
            return <BoardCell key={`${rowIndex}-${cellIndex}`} cell={cell} cellIndex={cellIndex} rowIndex={rowIndex} />
          })}</div>
        })
      }</div>
      <h2
      className="board-current-player"
      onClick={() => dispatch(
        selectCell(
          game.currentPlayer,
          getRandomCell(board.length),
          getRandomCell(board.length)
        )
      )}>Current Player: {game.currentPlayer}</h2>
      <button
      className="board__reset-button"
      aria-label="Reset Game"
      onClick={() =>
      dispatch(
        resetGame()
      )}
      >
      Reset Game
    </button>
    </div>
  )
}
