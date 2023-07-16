import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.data;

export const selectFilter = state => state.filter;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (data, filter) => {
    const tag = !!Number(filter) ? 'phone' : 'name';
    return data.filter(contact =>
      contact[tag].toLowerCase().includes(filter.toLowerCase())
    );
  }
);
