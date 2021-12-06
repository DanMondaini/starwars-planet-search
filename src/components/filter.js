import React, { useState, useContext, useEffect } from 'react';
import MyContext from '../context/myContext';

export default function Filter() {
  const [query, setQuery] = useState('');
  const { searchState, setSearchState, planets, setFiltered } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
    searchState.filters.filterByName = value;
    setSearchState(searchState);
  };

  const filterPlanetsByName = () => {
    const { filterByName } = searchState.filters;
    const filteredResults = planets
      .filter(({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()));
    setFiltered(filteredResults);
  };

  useEffect(() => {
    const { filterByName } = searchState.filters;
    if (filterByName !== '') filterPlanetsByName(); else setFiltered(planets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState.filters.filterByName]);

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ query }
      onChange={ handleChange }
    />
  );
}

// O requisito 2 foi feito com consulta ao repositorio do Nataniel Santos - link: https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/89/commits/7b9ee886245cfdf7db0e3bf41fddad43d3e5e30f
