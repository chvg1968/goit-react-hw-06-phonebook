import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactSlice';
import { nanoid } from 'nanoid';

function ContactList() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={nanoid()}>
          {contact.name}: {contact.number}
          <button onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;