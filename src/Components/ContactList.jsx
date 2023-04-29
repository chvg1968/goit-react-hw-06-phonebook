  import PropTypes from 'prop-types';

  function ContactList({ contacts, onDeleteContact }) {
    const handleDeleteClick = (id) => {
      onDeleteContact(id);
    };

    return (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <button onClick={() => handleDeleteClick(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  export default ContactList;
