import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/api';
import MyContext from './myContext';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchState, setSearchState] = useState({
    filters: {
      filterByName: '',
    },
  });
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchPlanets().then(setPlanets);
  }, []);

  const contextValues = {
    planets,
    searchState,
    setSearchState,
    filtered,
    setFiltered,
  };

  return (
    <MyContext.Provider value={ contextValues }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
