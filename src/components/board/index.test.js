import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Board } from '.';
import {BoardCell} from '../boardcell/BoardCell'
import configureStore from '../../store';
import { Provider } from 'react-redux';

const setupBoard = () => {
  render(<Provider store={configureStore()}><Board /></Provider>);
}

const setupBoardWithCell = () => {
  render(<Provider store={configureStore()}><Board><BoardCell /></Board></Provider>);
}

test('renders a h1 heading', () => {
  setupBoard();
  const headings = screen.getAllByRole('heading');
  expect(headings[0]).toHaveTextContent(/Tic Tac Toe Board/i);
});

test('renders multiple boardcells in the board', () => {
  setupBoardWithCell();
  const boardcells = screen.getAllByRole('button');
  expect(boardcells).toBeTruthy();
});

test('updates Current Player after each move', () => {
  setupBoardWithCell();
  const boardcells = screen.getAllByTestId(/cellbutton/i);
  const firstBoardcell = boardcells[0];
  const currentPlayerText = screen.getByText(/Current Player/i);
  fireEvent.click(firstBoardcell);
  expect(firstBoardcell).toHaveTextContent('X');
  expect(currentPlayerText).toHaveTextContent('Current Player: O');
});