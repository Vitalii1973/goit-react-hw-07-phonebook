import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const setFilter = (state, action) => {
  state.filter = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
export { addContact as addContactAsync, deleteContact as deleteContactAsync };
