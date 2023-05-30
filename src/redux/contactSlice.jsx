import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      const isContactExist = state.contacts.some(
        (contact) => contact.name === action.payload.name
      );

      if (isContactExist) {
        alert(`${action.payload.name} is already in the contact list`);
      } else {
        const newContact = {
          ...action.payload,
          id: `id-${state.contacts.length + 1}`,
        };
        state.contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    loadContacts: (state) => {
      const storedContacts = localStorage.getItem('contacts');
      state.contacts = storedContacts ? JSON.parse(storedContacts) : [];
    },
  },
});

export const {
  addContact,
  deleteContact,
  setFilter,
  loadContacts,
} = contactSlice.actions;

export default contactSlice;
