import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { fetchContacts } from 'redux/operations';
import ScrollToTop from 'react-scroll-to-top';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Title, ContainerCSS } from './MainContainerCSS';

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
  const first = useRef(true);

  useEffect(() => {
    if (!!error) {
      toast.error(error, toastOpts);
    }
    if (first.current) {
      first.current = !first.current;
      return;
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
