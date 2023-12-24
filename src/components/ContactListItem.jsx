import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contacts/contactsSlice';
import './Buttons.css';

const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  const deleteContactHandler = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmDelete) {
      dispatch(deleteContact(contact.id));
    }
  };

  return (
    <li>
      {contact.name}: {contact.number}{' '}
      <button
        className="deleteContactButton"
        type="button"
        onClick={deleteContactHandler}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactListItem;
