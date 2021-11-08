import { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    if (
      contacts.some((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`${name} is alerady in your contacts`);
      return;
    }
    setContacts((prevState) => [...prevState, { id: v4(), name, number }]);
  };
  const search = ({ target: { value } }) => {
    setFilter(value);
  };
  const filterItems = () =>
    contacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteItem = (id) => {
    setContacts(contacts.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter onChange={search} />
      <ContactList contacts={filterItems()} onDelete={deleteItem} />
    </div>
  );
};

export default App;
