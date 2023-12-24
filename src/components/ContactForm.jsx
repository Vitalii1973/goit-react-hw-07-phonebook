// src/components/ContactForm.jsx

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

    // Перевірка наявності контакту з таким ім'ям
    const isNameExists = contacts.some(contact => contact.name === name);

    if (isNameExists) {
      // Якщо ім'я вже існує, вивести alert і очистити поля
      alert(`Contact with name "${name}" already exists!`);
      setName('');
      setNumber('');
      return;
    }

    // Якщо ім'я не існує, додати новий контакт
    dispatch(addContact({ name, number }));

    // Очистити поля після додавання контакту
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
