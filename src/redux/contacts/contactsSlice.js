// src/redux/contacts/contactsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await fetch(
      'https://6585451d022766bcb8c83c57.mockapi.io/contacts'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await fetch(
      'https://6585451d022766bcb8c83c57.mockapi.io/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await fetch(
      `https://6585451d022766bcb8c83c57.mockapi.io/contacts/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    return contactId;
  }
);

export const selectFilter = state => state.contacts.filter;

export const selectFilteredContacts = state => {
  // ваш код селектора
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.data = state.data.filter(contact => contact.id !== action.payload);
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
