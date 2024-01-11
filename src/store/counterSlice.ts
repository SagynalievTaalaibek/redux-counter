import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchCounter } from './counterThunks';

interface CounterState {
  value: number;
  fetchLoading: boolean;
  isError: boolean;
}

const initialState: CounterState = {
  value: 0,
  fetchLoading: false,
  isError: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCounter.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCounter.fulfilled, (state, action) => {
      state.value = action.payload;
      state.fetchLoading = false;
    });
    builder.addCase(fetchCounter.rejected, (state) => {
      state.fetchLoading = false;
      state.isError = true;
    });
  },
});

export const counterReducer = counterSlice.reducer;
export const selectFetchCounterLoading = (state: RootState) => state.counter.fetchLoading;


