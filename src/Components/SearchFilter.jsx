import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Find contacts"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

SearchFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter;
