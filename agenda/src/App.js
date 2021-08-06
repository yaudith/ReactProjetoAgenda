import React from 'react';
import './App.css';
import Header from './components/Header';
import ListContacts from './components/ListContacts';

function App() {
  return (
    <div className="App">
      <Header/>
      <ListContacts/>
    </div>
  );
}

export default App;