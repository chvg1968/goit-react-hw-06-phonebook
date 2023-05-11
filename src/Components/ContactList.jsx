import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function ContactList({ contacts, onDeleteContact }) {
const [contactList, setContactList] = useState(contacts);

useEffect(() => {
setContactList(contacts);
}, [contacts]);

const handleDeleteClick = (id) => {
onDeleteContact(id);
};

return (
<ul>
{contactList.map((contact) => (
<li key={contact.id}>
{contact.name} : {contact.number}
<button onClick={() => handleDeleteClick(contact.id)}>Delete</button>
</li>
))}
</ul>
);
}

ContactList.propTypes = {
contacts: PropTypes.array.isRequired,
onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;