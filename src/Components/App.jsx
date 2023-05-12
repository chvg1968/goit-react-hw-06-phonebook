import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import data from './data.json';
import '../App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(data.contacts || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    const isContactExist = contacts.some((contact) => contact.name === newContact.name);
    isContactExist 
      ? alert(`${newContact.name} ya está en la lista de contactos`)
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
      <h1>Agenda telefónica ☎</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contactos</h2>
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
