import { useDispatch } from 'react-redux';
import { addContacts } from '../redux/contactSlice';
import { useState, useRef } from 'react';

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addContacts({ name, number }));
    setName('');
    setNumber('');
    nameInputRef.current.focus();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name:
      </label>
      <input
        type="text"
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я]+)*[a-zA-Zа-яА-Я])$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        name="name"
        value={name}
        onChange={handleChange}
        ref={nameInputRef}
      />
      <label>
        Number:
      </label>
      <input
        type="text"
        placeholder="Phone Number"
        pattern="^\+?\d{1,4}?[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        name="number"
        value={number}
        onChange={handleChange}
        ref={numberInputRef}
        />
        <button type="submit">Add Contact</button>
        </form>
        );
        }
        
        export default ContactForm;
