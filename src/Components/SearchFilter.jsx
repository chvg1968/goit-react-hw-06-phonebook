import { Component } from "react";
import PropTypes from 'prop-types';

class SearchFilter extends Component {
  render() {
    const { filter, onChange } = this.props;
    return (
      <input 
       type="text"
       name="filter"
       value={filter}
       onChange={({target}) => onChange(target.value)}
       placeholder="Find Contacts"
      />
    );
  }
}

SearchFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearchFilter;
