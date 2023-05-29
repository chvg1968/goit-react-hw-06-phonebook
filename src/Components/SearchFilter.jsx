import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/contactSlice';

const SearchFilter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={({ target }) => dispatch(setFilter(target.value))}
      placeholder="Buscar contactos"
    />
  );
}

export default SearchFilter;