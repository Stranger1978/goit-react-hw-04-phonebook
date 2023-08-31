import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
import { nanoid } from 'nanoid';
//import PropTypes from 'prop-types';

export function App() {
  
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const NewContact = {
      id: nanoid(),
      name,
      number
    };
    
    if (contacts.some((contact) => name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts([NewContact, ...contacts]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  const getVisibleContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter));
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) { 
      setContacts(parsedContacts);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

    const visibleContacts = getVisibleContact();
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact}/>
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter}/>
          <ContactList contactList={visibleContacts} onDelete={deleteContact} />    
        </Section>
    </div>    
      );
  };