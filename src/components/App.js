import React, { useState } from 'react';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Loginpage from './Loginpage';

function App() {
  const [id, setId] = useLocalStorage();

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return (
    <>
      {id ? dashboard : < Loginpage onIdSubmit={setId} />}
    </>
  );
}

export default App;
