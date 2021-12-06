import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../services/api';
import DataContext from './myContext';

export default function Provider({ children }) {
  const [data, setData] = useState();
  useEffect(() => {
    const getResponse = async () => {
      const response = await fetchData();
      setData(response);
      return response;
    };
    getResponse();
  }, []);

  return (
    <DataContext.Provider value={ { data } }>
      {children}
    </DataContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
