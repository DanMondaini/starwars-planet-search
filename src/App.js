import React from 'react';
import './App.css';
import Table from './components/table';
import Filter from './components/filter';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

//

export default App;
