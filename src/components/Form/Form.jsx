import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { FormContainerCSS, FormInputCSS } from '../MainContainerCSS';
import { getContacts } from 'redux/selectors';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = evt => {
    evt.preventDefault();
    const {
      elements: { name, number },
    } = evt.currentTarget;
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.value.trim().toLowerCase()
      )
    ) {
      alert(`${name.value.trim()} is already in contacts!`);
      return;
    }
    dispatch(addContact(name.value.trim(), number.value.trim()));
    evt.currentTarget.reset();
  };

  return (
    <FormContainerCSS onSubmit={handleSubmit}>
      <label>
        Name:
        <FormInputCSS
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number:
        <FormInputCSS
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </FormContainerCSS>
  );
};
