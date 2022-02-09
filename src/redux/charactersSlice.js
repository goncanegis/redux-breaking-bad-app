import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const char_limit = 12;

const initialState = {
  items: [],
  status: 'idle',
  page: 0,
  hasNextPage: true,
};

export const fetchCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (page) => {
    const res = await axios(
      `${
        process.env.REACT_APP_BASE_URL
      }/characters?limit=${char_limit}&offset=${page * char_limit}`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.page++;
      state.status = 'succeeded';

      if (action.payload.length < 12) {
        state.hasNextPage = false;
      }
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'failed';
    },
  },
});

export default charactersSlice.reducer;
