import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import data from './data.json';
import '../App.css';
import Storage from './Storage';

class App extends Component {
  constructor(props) {
    super(props);
    const storedContacts = localStorage.getItem('contacts');
    this.state = {
      contacts: storedContacts ? JSON.parse(storedContacts) : data.contacts || [],
      filter: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (newContact) => {
    const isContactExist = this.state.contacts.some(
      (contact) => contact.name === newContact.name
    );
    isContactExist
      ? alert(`${newContact.name} ya está en la lista de contactos`)
      : this.setState((prevState) => ({
          contacts: [
            ...prevState.contacts,
            { ...newContact, id: `id-${prevState.contacts.length + 1}` },
          ],
        }));
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="phonebox">
        <h1>Agenda telefónica ☎</h1>
        <Storage />
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contactos</h2>
        <SearchFilter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default App;
