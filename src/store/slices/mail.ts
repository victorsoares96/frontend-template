import { createSlice } from '@reduxjs/toolkit';

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
  mails: {
    byId: {
      [key: string]: any;
    };
    allIds: string[];
  };
  labels: any[];
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
  mails: { byId: {}, allIds: [] },
  labels: [],
};

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getLabelsSuccess(state, action) {
      state.isLoading = false;
      state.labels = action.payload;
    },
    getMailsSuccess(state, action) {
      const mails = action.payload;

      state.isLoading = false;
      state.mails.byId = objFromArray(mails);
      state.mails.allIds = Object.keys(state.mails.byId);
    },
    getMailSuccess(state, action) {
      const mail = action.payload;

      state.mails.byId[mail.id] = mail;
      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id);
      }
    },
  },
});

export default slice.reducer;

export const getLabels = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get('/api/mail/labels');
    dispatch(slice.actions.getLabelsSuccess(response.data.labels));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getMails =
  (params: unknown): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mails', { params });
      dispatch(slice.actions.getMailsSuccess(response.data.mails));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const getMail =
  (mailId: string): AppThunk =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId },
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
