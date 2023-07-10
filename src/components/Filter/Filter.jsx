import { FormInputCSS } from 'components/MainContainerCSS';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const isDisabled = !contacts.length;
  const dispatch = useDispatch();

  const handleChange = evt => {
    evt.preventDefault();
    dispatch(setFilter(evt.target.value.trim()));
  };

  return (
    <label>
      Filter by Name:
      <FormInputCSS
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        disabled={isDisabled}
        value={filter}
        onChange={handleChange}
      />
    </label>
  );
};
