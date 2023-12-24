// selector.js
import { createSelector } from '@reduxjs/toolkit';

export const selectContactsState = state => state.contacts;

export const selectFilter = state => selectContactsState(state)?.filter;

export const selectVisibleContacts = createSelector(
  [selectContactsState, selectFilter],
  (contacts, filter) => {
    if (!contacts || !contacts.data) {
      return [];
    }

    return contacts.data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
