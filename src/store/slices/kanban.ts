import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

import axios from '../../utils/axios';
import type { AppThunk } from '../types';

function objFromArray<T>(array: T[], key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

type InitialState = {
  isLoading: boolean;
  error: string | null;
  board: {
    cards: any;
    columns: any;
    columnOrder: any;
  };
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
  },
};

const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = objFromArray(board.cards);
      const columns = objFromArray(board.columns);
      const { columnOrder } = board;
      state.board = {
        cards,
        columns,
        columnOrder,
      };
    },
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn,
      };
      state.board.columnOrder.push(newColumn.id);
    },
    persistCard(state, action) {
      const columns = action.payload;
      state.board.columns = columns;
    },
    persistColumn(state, action) {
      state.board.columnOrder = action.payload;
    },
    addTask(state, action) {
      const { card, columnId } = action.payload;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },
    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter(
        (id) => id !== cardId,
      );
      state.board.cards = omit(state.board.cards, [cardId]);
    },
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

export const getBoard = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get('/api/kanban/board');
    dispatch(slice.actions.getBoardSuccess(response.data.board));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const createColumn =
  (newColumn: unknown): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/new', newColumn);
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const updateColumn =
  (columnId: string, updateColumn: unknown): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/kanban/columns/update', {
        columnId,
        updateColumn,
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const deleteColumn =
  (columnId: string): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/kanban/columns/delete', { columnId });
      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const persistColumn =
  (newColumnOrder: unknown): AppThunk =>
  async (dispatch) =>
    dispatch(slice.actions.persistColumn(newColumnOrder));

export const persistCard =
  (columns: unknown): AppThunk =>
  async (dispatch) =>
    dispatch(slice.actions.persistCard(columns));

export const addTask =
  ({ card, columnId }: { card: unknown; columnId: string }): AppThunk =>
  async (dispatch) =>
    dispatch(slice.actions.addTask({ card, columnId }));

export const deleteTask =
  ({ cardId, columnId }: { cardId: string; columnId: string }): AppThunk =>
  async (dispatch) =>
    dispatch(slice.actions.deleteTask({ cardId, columnId }));
