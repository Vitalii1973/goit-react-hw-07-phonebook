import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../actions/actions';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default dataSlice.reducer;
