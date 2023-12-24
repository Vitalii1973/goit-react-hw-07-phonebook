import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem';
import { fetchContacts } from '../../redux/contacts/contactsSlice';
import { selectVisibleContacts } from '../../redux/selector';
import './ContactList.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="ContactListContainer">
      <ul className="ContactList">
        {filteredContacts.map(contact => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
