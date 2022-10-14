import { createSlice } from '@reduxjs/toolkit';

import type { AppThunk } from '@/store/types';

import axios from '../../utils/axios';

type InitialState = {
  isLoading: boolean;
  error: string | null;
  events: any[];
  isOpenModal: boolean;
  selectedEventId: number | null;
  selectedRange: any;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = state.events.filter((event) => event.id !== eventId);
      state.events = deleteEvent;
    },
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

export default slice.reducer;

export const { openModal, closeModal, selectEvent } = slice.actions;

export const getEvents = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get('/api/calendar/events');
    dispatch(slice.actions.getEventsSuccess(response.data.events));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const createEvent =
  (newEvent: unknown): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const updateEvent =
  (eventId: number, updateEvent: unknown): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent,
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const deleteEvent =
  (eventId: number): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const selectRange =
  (start: Date, end: Date): AppThunk =>
  async (dispatch) => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      }),
    );
  };
