import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { List } from 'components/MainContainerCSS';

export const ContactsList = ({ contacts }) => {
  const dispatch = useDispatch();
  const handleClick = evt => {
    dispatch(deleteContact(evt.target.dataset.id));
  };

  return (
    <List>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: <span>{contact.phone}</span>
          <button type="button" data-id={contact.id} onClick={handleClick}>
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
