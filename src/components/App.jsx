import React, { useState } from 'react'; 
import { nanoid } from 'nanoid'; 
import AddContactForm from './ContactForm/AddContactForm';
import ContactList from './ContactList/ContactList';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if (isDuplicate) {
      alert(`Contact with name "${name}" already exists! Please use a different name.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <AddContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search contacts..."
        className="filter-input"
      />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;