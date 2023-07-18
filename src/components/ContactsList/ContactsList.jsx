import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { List } from 'components/MainContainerCSS';
import { selectCurrentID, selectIsDeleting } from 'redux/selectors';
import { setCurrentID } from 'redux/contactsSlice';

export const ContactsList = ({ contacts }) => {
  const dispatch = useDispatch();
  const isDeleting = useSelector(selectIsDeleting);
  const currentID = useSelector(selectCurrentID);
  const handleClick = evt => {
    const currentID = evt.target.dataset.id;
    dispatch(setCurrentID(currentID));
    dispatch(deleteContact(currentID));
  };

  return (
    <List>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: <span>{contact.phone}</span>
          <button
            type="button"
            disabled={isDeleting && currentID === contact.id}
            data-id={contact.id}
            onClick={handleClick}
          >
            Delete
          </button>
        </li>
      ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
