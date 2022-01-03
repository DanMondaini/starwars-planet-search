import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/api';
import MyContext from './myContext';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchState, setSearchState] = useState({
    filters: {
      filterByName: '',
      filterByNumericValues: [],
    },
  });
  const [tableArray, setTableArray] = useState(planets);

  useEffect(() => {
    fetchPlanets().then((response) => {
      setPlanets(response);
      setTableArray(response);
    });
  }, []);

  const contextValues = {
    planets,
    searchState,
    setSearchState,
    tableArray,
    setTableArray,
  };

  return (
    <MyContext.Provider value={ contextValues }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};
