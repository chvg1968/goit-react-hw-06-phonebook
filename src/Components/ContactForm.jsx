import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, number } = this.state;
    const { onAddContact } = this.props;
    onAddContact({ name, number });
    this.setState({ name: '', number: '' });
  }

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
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <label>
          Number:
        </label>
        <input
          type="text"
          placeholder="Phone Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(event) => this.setState({ number: event.target.value })}
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