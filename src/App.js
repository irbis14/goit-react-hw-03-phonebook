import { Component } from "react";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import Contacts from "./components/Contacts";
import ContactsItem from "./components/ContactsItem";

import { v4 as uuidv4 } from "uuid";

import "./App.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContact = (newContact) => {
    const contact = {
      id: uuidv4(),
      ...newContact,
    };

    // Проверка на дублирование имени контакта
    if (
      this.state.contacts.find((oldContact) => {
        return oldContact.name.toLowerCase() === contact.name.toLowerCase();
      })
    ) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  onChangeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (e) => {
    const { contacts } = this.state;
    const deleteName = e.target.name;
    const restContacts = contacts.filter(
      (contact) => contact.name !== deleteName
    );
    this.setState({
      contacts: restContacts,
    });
  };

  componentDidMount() {
    const initialContacts = JSON.parse(localStorage.getItem("contact"));
    if (initialContacts) {
      this.setState({ contacts: initialContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contact", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContact = this.filterContact();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter onChangeFilter={this.onChangeFilter} value={filter} />
        <Contacts>
          <ContactsItem
            items={filteredContact}
            onDeleteContact={this.deleteContact}
          />
        </Contacts>
      </div>
    );
  }
}

export default App;
