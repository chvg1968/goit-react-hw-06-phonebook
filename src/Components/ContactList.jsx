import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from '../redux/selectors';
import { deleteContacts } from '../redux/contactSlice';



const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getVisibleContacts = () => {
    const normalizeFilter = filter.trim().toLowerCase();
    return contacts.filter(contact =>
      String(contact.name).toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  console.log(visibleContacts);

    return (
      <ul className="contact-lists">
        {visibleContacts.map((contact) => (
          <li className="contact" key={contact.id}>
            {contact.name} : {contact.number}
            <button onClick={() => dispatch(deleteContacts(contact.id))}>Delete</button>
          </li>
        ))}
      </ul>
    );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList; 