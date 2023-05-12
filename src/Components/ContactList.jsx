import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: props.contacts,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      this.setState({ contactList: this.props.contacts });
    }
  }

  handleDeleteClick = (id) => {
    this.props.onDeleteContact(id);
  };

  render() {
    const { contactList } = this.state;
    return (
      <ul>
        {contactList.map((contact) => (
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
