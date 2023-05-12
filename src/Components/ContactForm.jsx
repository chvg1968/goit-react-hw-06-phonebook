import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
    this.nameInputRef = React.createRef();
    this.numberInputRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact({ name, number });
    this.setState({ name: '', number: '' });
    this.nameInputRef.current.focus();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Name:
        </label>
        <input
          type="text"
          placeholder="Name"
          pattern="^[a-zA-Zа-rА-R]+(([' -][a-zA-Zа-rА-R ])?[a-zA-Zа-rА-R])$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          name="name"
          value={name}
          onChange={this.handleChange}
          ref={this.nameInputRef}
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
          name="number"
          value={number}
          onChange={this.handleChange}
          ref={this.numberInputRef}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
