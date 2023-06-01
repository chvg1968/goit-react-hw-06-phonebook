import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from '../redux/filterSlice';

const SearchFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(filterContacts(event.target.value));
  };
  

  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search contacts"
    />
  );
};

export default SearchFilter;
