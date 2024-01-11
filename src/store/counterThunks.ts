import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';

export const fetchCounter = createAsyncThunk(
  'counter/fetch',
  async () => {
    const response = await axiosApi.get<number | null>('/counter.json');

    return response.data ?? 0;
  },
);

export const increaseCounter = createAsyncThunk<void, undefined, { state: RootState }>(
  'counter/increaseOne',
  async (_, thunkAPI) => {
    const currentValue = thunkAPI.getState().counter.value;
    await axiosApi.put('/counter.json', currentValue + 1);
  },
);

export const decreaseCounter = createAsyncThunk<void, undefined, { state: RootState }>(
  'counter/decreaseOne',
  async (_, thunkAPI) => {
    const currentValue = thunkAPI.getState().counter.value;
    if (currentValue === 0) {
      return;
    }

    await axiosApi.put('/counter.json', currentValue - 1);
  },
);

export const increaseCounterByFive = createAsyncThunk<void, undefined, { state: RootState }>(
  'counter/increaseFive',
  async (_, thunkAPI) => {
    const currentValue = thunkAPI.getState().counter.value;
    await axiosApi.put('/counter.json', currentValue + 5);
  },
);

export const decreaseCounterByFive = createAsyncThunk<void, undefined, { state: RootState }>(
  'counter/decreaseFive',
  async (_, thunkAPI) => {
    const currentValue = thunkAPI.getState().counter.value;

    if (currentValue === 0 || currentValue - 5 < 0) {
      return;
    }

    await axiosApi.put('/counter.json', currentValue - 5);
  },
);