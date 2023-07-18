import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectContacts, selectFilter } from 'redux/selectors';
import { FormInputCSS } from 'components/MainContainerCSS';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = evt => {
    evt.preventDefault();
    dispatch(setFilter(evt.target.value.trim()));
  };

  return (
    <label>
      Filter by: use "chars" OR "numbers"...
      <FormInputCSS
        type="text"
        name="filter"
        title="Search"
        required
        disabled={!contacts.length}
        value={filter}
        onChange={handleChange}
      />
    </label>
  );
};
