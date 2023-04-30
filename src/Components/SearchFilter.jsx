import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchFilter extends Component {
  render() {
    const { value, onChange } = this.props;
    
    return (
      <input
        type="text"
        placeholder="Find contacts"
        value={value}
        onChange={onChange}
      />
    );
  }
}

SearchFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter;
