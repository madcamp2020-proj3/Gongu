import React, { Component, useState } from 'react';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import useLoginStorage from '../hooks/useLoginStorage';
import Dashboard from './Dashboard';
import Loginpage from './Loginpage';
import Domain from '../domaincomp/Domain';
import { BrowserRouter, Route } from 'react-router-dom';
import useIdStorage from '../hooks/useIdStorage';
import Conversation from './Conversation';

function App() {
  const [login, setLogin] = useLoginStorage();
  const [id, setId] = useIdStorage();

  const dashboard = (id) => {
    return (
      <SocketProvider id={id}>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </SocketProvider>
    );
  }

  const doaminboard = (id) => {
    return (
      <ConversationsProvider id={id}>
        <Domain setLogin={setLogin} userId={id} />
      </ConversationsProvider>
    );
  }

  return (
    <BrowserRouter>
      <Route path='/' exact render={
        props => {
          return (
            !login
              ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} />
              : doaminboard(id)
          );
        }}
      />
      <Route path='/chatroom/:roomId' render={props => dashboard(id)} />
    </BrowserRouter>
  );
}

export default App;
