import { createSlice} from '@reduxjs/toolkit';

// Definición del slice
const contactSlice = createSlice({
  name: 'contactos',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Acciones generadas automáticamente
export const { addContact, deleteContact, setFilter } = contactSlice.actions;

