import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import Storage from './Storage';
import { addContact, deleteContact, setFilter } from '../redux/contactSlice';
import '../App.css';

function App({ filter, contacts, handleAddContact, handleDeleteContact, handleFilterChange }) {
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter && typeof filter === 'string' ? filter.toLowerCase() : '')
  );

  return (
    <div className="phonebox">
      <h1>Phonebook ☎</h1>
      <Storage />
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <SearchFilter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={handleDeleteContact} />
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
};

const mapStateToProps = (state) => ({
  contacts: state.contacts || [],
  filter: state.filter || '',
});

const mapDispatchToProps = (dispatch) => ({
  handleAddContact: (contact) => dispatch(addContact(contact)),
  handleDeleteContact: (id) => dispatch(deleteContact(id)),
  handleFilterChange: (filter) => dispatch(setFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
