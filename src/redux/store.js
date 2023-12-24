import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const selectFilter = state => state.contacts.filter;

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(
    'https://6585451d022766bcb8c83c57.mockapi.io/contacts'
  );
  const data = await response.json();
  return data;
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

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter } = contactsSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
