import PropTypes from 'prop-types'; 

function SearchFilter({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Find contacts"
      value={value}
      onChange={onChange}
    />
  );
}

SearchFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchFilter; 