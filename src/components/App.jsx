import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'react-scroll-to-top';
import { Loader } from './Loader/Loader';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, ContainerCSS } from './MainContainerCSS';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

const toastOpts = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const selectedContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    if (!!error) {
      toast.error(error, toastOpts);
    }
    dispatch(fetchContacts());
  }, [dispatch, error]);

  return (
    <ContainerCSS>
      <ScrollToTop
        smooth
        top={100}
        component={<p style={{ color: 'blue' }}>UP</p>}
      />
      <Title>Phonebook</Title>
      <Form />
      <Title>Contacts</Title>
      <Filter />
      {isLoading && <Loader />}
      {!!selectedContacts.length && (
        <ContactsList contacts={selectedContacts} />
      )}
      <ToastContainer />
    </ContainerCSS>
  );
};
