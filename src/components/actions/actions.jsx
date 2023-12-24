import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetch', async () => {
  try {
    const response = await fetch('https://example.com/api/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});
