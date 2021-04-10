import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import {Board} from '../board/index';
import { BoardCell } from '../boardcell/BoardCell';
import configureStore from '../../store';
import { Provider } from 'react-redux';

global.alert = jest.fn();

const setupBoardCell = () => {
    render(<Provider store={configureStore()}><BoardCell /></Provider>);
  }
  
  const setupBoardWithCell = () => {
    render(<Provider store={configureStore()}><Board><BoardCell /></Board></Provider>);
  }

test('renders a board cell', () => {
    setupBoardCell();
    const boardcell = screen.getByTestId(/cellbutton/i);
    expect(boardcell).toBeTruthy();
});

test('changes the value of a square on click', () => {
    setupBoardWithCell();
    const boardcells = screen.getAllByTestId(/cellbutton/i);
    const firstBoardcell = boardcells[0];
    fireEvent.click(firstBoardcell);
    expect(firstBoardcell).toHaveTextContent('X');
});

test('displays an alert box if player clicks taken square', () => {
    setupBoardWithCell();
    const boardcells = screen.getAllByTestId(/cellbutton/i);
    const firstBoardcell = boardcells[0];
    fireEvent.click(firstBoardcell);
    expect(firstBoardcell).toHaveTextContent('X');
    fireEvent.click(firstBoardcell);
    expect(global.alert).toBeCalledWith('Nuh uh uh, cell taken, try again!');
});
