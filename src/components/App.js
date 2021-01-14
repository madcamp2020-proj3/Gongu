import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Loginpage from './Loginpage';

function App() {
  const [id, setId] = useLocalStorage();
  // const [id, setId] = useState();

  return (
    <>
      {id ? <Dashboard id={id} /> : < Loginpage onIdSubmit={setId} />}
    </>
  );
}

export default App;
