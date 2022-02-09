import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
};

export const fetchCharacters = createAsyncThunk(
  'characters/getCharacters',
  async () => {
    const res = await axios(
      `${process.env.REACT_APP_BASE_URL}characters?limit=10`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCharacters.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

// export const { } = charactersSlice.actions;

export default charactersSlice.reducer;
