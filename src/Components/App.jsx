import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import data from './data.json';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      filter: ''
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    } else {
      this.setState({ contacts: data.contacts || [] });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleAddContact = (newContact) => {
    const { contacts } = this.state;
    const isContactExist = contacts.some((contact) => contact.name === newContact.name);
    isContactExist 
      ? alert(`${newContact.name} ya está en la lista de contactos`)
      : this.setState({
        contacts: [...contacts, { ...newContact, id: `id-${contacts.length + 1}` }]
      });
  };

  handleDeleteContact = (contactId) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    this.setState({ contacts: updatedContacts });
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
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contactos</h2>
        <SearchFilter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
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
  )
};

export default App;
