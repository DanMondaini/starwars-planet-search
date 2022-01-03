import React from 'react';
import './App.css';
import Table from './components/table';
import Filter from './components/filter';
import SearchInput from './components/SearchInput';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
      <SearchInput />
    </Provider>
  );
}

//

export default App;
