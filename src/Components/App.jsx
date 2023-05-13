import { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import Storage from './Storage';
import data from './data.json';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const storedContacts = localStorage.getItem('contacts');
    this.state = {
      allContacts: storedContacts ? JSON.parse(storedContacts) : data.contacts || [],
      filteredContacts: [],
      filter: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allContacts !== this.state.allContacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.allContacts));
    }
  }


  updateFilteredContacts = () => {
    const { allContacts, filter } = this.props;

    const filteredContacts = allContacts.filter((contact) => {
      const name = contact.name.toLowerCase();
      return name.includes(filter.toLowerCase());
    });

    this.setState({ filteredContacts });
  };

  handleAddContact = (newContact) => {
    const isContactExist = this.state.allContacts.some(
      (contact) => contact.name === newContact.name
    );
    if (isContactExist) {
      alert(`${newContact.name} ya está en la lista de contactos`);
    } else {
      const allContacts = [
        ...this.state.allContacts,
        { ...newContact, id: `id-${this.state.allContacts.length + 1}` },
      ];
      this.setState({ allContacts, filteredContacts: allContacts });
    }
  };

  handleDeleteContact = (contactId) => {
    const allContacts = this.state.allContacts.filter(
      (contact) => contact.id !== contactId
    );
    const filteredContacts = this.state.filteredContacts.filter(
      (contact) => contact.id !== contactId
    );
    this.setState({ allContacts, filteredContacts });
  };

  handleFilterChange = (filter) => {
    this.props.onFilterChange(filter);
    this.updateFilteredContacts();
  };

  render() {
    const { allContacts, filteredContacts, filter } = this.state;

    return (
      <div className="phonebox">
        <h1>Agenda telefónica ☎</h1>
        <Storage />
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contactos</h2>
        <SearchFilter value={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={allContacts}
          onDeleteContact={this.handleDeleteContact}
          filteredContacts={filteredContacts}
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
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  allContacts:PropTypes.array.isRequired
};

App.defaultProps = {
  contacts: [],
  filter: '',
};

export default App;