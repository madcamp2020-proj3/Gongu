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

function App() {
  const [login, setLogin] = useLoginStorage();
  const [id, setId] = useState();

  const dashboard = (id) => {
    console.log(id);
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
    // <>
    //   {/* {login ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} /> : dashboard(id)} */}
    //   {!login ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} /> : <Domain setLogin={setLogin} />}
    // </>
    // <Route path='/' render={props => <Test />} />
    <BrowserRouter>
      <Route path='/' exact render={
        props => {
          return (
            !login
              ? <Loginpage onIdSubmit={setId} onLoginAdmit={setLogin} />
              : <Domain setLogin={setLogin} userId={id} />
          );
        }}
      />
      <Route path='/chatroom:roomId' render={props => dashboard(id)} />
    </BrowserRouter>
  );
}

export default App;
