import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/contacts/contactsSlice';
import { selectVisibleContacts } from '../redux/selector';
import './Buttons.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const isNameExists = contacts.some(contact => contact.name === name);

    if (isNameExists) {
      alert(`Contact with name "${name}" already exists!`);
      setName('');
      setNumber('');
      return;
    }

    dispatch(addContact({ name, number }));

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Number:
        <input type="text" value={number} onChange={handleNumberChange} />
      </label>
      <br />
      <button className="addContactButton" type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
