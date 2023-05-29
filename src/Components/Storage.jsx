import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact} from '../redux/contactSlice';

function Storage() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    // Obtener los contactos almacenados previamente en el localStorage
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Actualizar el localStorage cuando se agreguen o eliminen contactos
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return null; // El componente Storage no tiene representación visual, por lo que se retorna null
}

export default Storage;
