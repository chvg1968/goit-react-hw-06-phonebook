import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/contactSlice';

const SearchFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value.toLowerCase()));
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
