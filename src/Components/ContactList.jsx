import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactList extends Component {
  handleDeleteClick = (id) => {
    this.props.onDeleteContact(id);
  };

  render() {
    const { contacts } = this.props;

    return (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <button onClick={() => this.handleDeleteClick(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
