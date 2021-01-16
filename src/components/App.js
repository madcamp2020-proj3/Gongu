import React, { Component, useState } from 'react';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Loginpage from './Loginpage';
import Domain from '../domaincomp/Domain';

function App() {
  // const [id, setId] = useLocalStorage();
  const [login, setLogin] = useState(true);
  const [id, setId] = useState();

  const dashboard = (id) => {
    return (
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    )
  };

  return (
    <>
      {/* {login ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} /> : dashboard(id)} */}
      {/* {login ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} /> : <Domain />} */}
      <Domain />

    </>
  );
}

export default App;