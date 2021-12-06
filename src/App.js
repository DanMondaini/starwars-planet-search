import React from 'react';
import './App.css';
import Table from './components/table';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

//

export default App;
