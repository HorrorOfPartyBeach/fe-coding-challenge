import { combineReducers } from "redux";
import { RESET_GAME, SELECT_CELL } from "../actions/moves";

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map(_ =>
      Array(i)
        .fill(null)
    )

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state))
      newBoard[action.row][action.col] = action.currentPlayer
      return newBoard
    }
    case RESET_GAME: {
      return createBoard(3)
    }
    default: {
      return state
    }
  }
}

export const game = (state = { currentPlayer: 'X', winner: null }, action) => {
  switch (action.type) {
    case SELECT_CELL: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
      }
    }
    case RESET_GAME: {
      return { currentPlayer: 'X', winner: null }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  board,
  game
})
