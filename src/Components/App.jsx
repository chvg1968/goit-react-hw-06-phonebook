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
      filter: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allContacts !== this.state.allContacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.allContacts));
    }
  }

  handleAddContact = (newContact) => {
    const isContactExist = this.state.allContacts.some(
      (contact) => contact.name === newContact.name
    );

    if (isContactExist) {
      alert(`${newContact.name} is already in the contact list`);
    } else {
      const allContacts = [
        ...this.state.allContacts,
        { ...newContact, id: `id-${this.state.allContacts.length + 1}` },
      ];
      this.setState({ allContacts });
    }
  };

  handleDeleteContact = (contactId) => {
    const allContacts = this.state.allContacts.filter(
      (contact) => contact.id !== contactId
    );

    this.setState({ allContacts });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { allContacts, filter } = this.state;
    let visibleContacts = [];

    if (filter !== '') {
      const filterRegex = new RegExp(filter, 'i');
      visibleContacts = allContacts.filter((contact) => filterRegex.test(contact.name));
    } else {
      visibleContacts = allContacts;
    }

    return visibleContacts;
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="phonebox">
        <h1>Phonebook ☎</h1>
        <Storage />
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <SearchFilter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  allContacts: PropTypes.array,
  filter: PropTypes.string.isRequired,
};

export default App;