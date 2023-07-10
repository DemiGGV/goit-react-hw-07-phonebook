import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, ContainerCSS } from './MainContainerCSS';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ContainerCSS>
      <Title>Phonebook</Title>
      <Form />
      <Title>Contacts</Title>
      <Filter />
      {!!filteredContacts.length && (
        <ContactsList contacts={filteredContacts} />
      )}
    </ContainerCSS>
  );
};
