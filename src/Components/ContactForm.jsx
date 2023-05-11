import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

function ContactForm({ onAddContact }) {
const [name, setName] = useState('');
const [number, setNumber] = useState('');
const nameInputRef = useRef(null);
const numberInputRef = useRef(null);

const handleSubmit = (event) => {
event.preventDefault();
onAddContact({ name, number });
setName('');
setNumber('');
nameInputRef.current.focus();
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
value={name}
onChange={(event) => setName(event.target.value)}
ref={nameInputRef}
/>
<label>
Number:
</label>
<input
type="text"
placeholder="Phone Number"
pattern="+?\d{1,4}?[-.\s]?
?
\d
1
,
3
?
?\d1,3??[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
required
value={number}
onChange={(event) => setNumber(event.target.value)}
ref={numberInputRef}
/>
<button type="submit">Add Contact</button>
</form>
);
}

ContactForm.propTypes = {
onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;