import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import Storage from './Storage';
import { addContact, deleteContact, setFilter, loadContacts } from '../redux/contactSlice';
import '../App.css';

function App({
  filter,
  contacts,
  loadContacts,
  handleAddContact,
  handleDeleteContact,
  handleFilterChange,
}) {
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const getVisibleContacts = () => {
    if (filter !== '') {
      const filterRegex = new RegExp(filter, 'i');
      return contacts.filter((contact) => filterRegex.test(contact.name));
    } else {
      return contacts;
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="phonebox">
      <h1>Phonebook ☎</h1>
      {/* <Storage /> */}
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <SearchFilter filter={filter} onChange={handleFilterChange} />
      <ContactList 
      contacts={visibleContacts} 
      onDeleteContact={handleDeleteContact} />
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  handleAddContact: PropTypes.func.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  loadContacts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts || [],
  filter: state.contacts.filter || '',
});

const mapDispatchToProps = {
  handleAddContact: addContact,
  handleDeleteContact: deleteContact,
  handleFilterChange: setFilter,
  loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
