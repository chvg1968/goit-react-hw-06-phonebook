import { useState } from 'react';
import data from './data.json';
import ContactForm from './ContactForm'; 
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import PropTypes from 'prop-types';
import '../App.css';

function App() {
  const [contacts, setContacts] = useState(data.contacts);
  const [filter, setFilter] = useState('');

  const handleAddContact = (newContact) => {
    const isContactExist = contacts.some((contact) => contact.name === newContact.name);
    isContactExist 
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts([...contacts, { ...newContact, id: `id-${contacts.length + 1}` }]);
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div className="phonebox">
      <h1>PhoneBook ☎</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <SearchFilter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
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
  )
};

export default App;