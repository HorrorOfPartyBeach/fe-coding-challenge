import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';
import './boardcell.css'

const selectGame = (state) => state.game

export const BoardCell = ({cellIndex, rowIndex, cell}) => {
    const game = useSelector(selectGame)
    const dispatch = useDispatch()

    return (
        <button
            name={cellIndex}
            data-testid="cellbutton"
            className="board-cell__button"
            onClick={(e) => {
                e.preventDefault();
                cell === null ?
                dispatch(
                selectCell(
                game.currentPlayer,
                rowIndex,
                cellIndex
                )
            )
            :
            alert('Nuh uh uh, cell taken, try again!')
            }}
            aria-label={cell === null ? `Row ${rowIndex}, Cell ${cellIndex}` : `Row ${rowIndex}, Cell ${cellIndex}, Player ${cell}`}
            aria-live="assertive"
            >
            {cell}
            </button>
    )
}