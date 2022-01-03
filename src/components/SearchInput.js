import React, { useState, useContext, useEffect } from 'react';
import MyContext from '../context/myContext';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const { searchState, setSearchState, planets, setTableArray } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
    searchState.filters.filterByName = value;
    setSearchState(searchState);
  };

  const filterPlanetsByName = () => {
    const { filterByName } = searchState.filters;
    const filteredResults = planets
      .filter(({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()));
    setTableArray(filteredResults);
  };

  useEffect(() => {
    const { filterByName } = searchState.filters;
    if (filterByName !== '') filterPlanetsByName(); else setTableArray(planets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // linha superior retirada do link: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  }, [searchState.filters.filterByName]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        data-testid="name-filter"
        value={ query }
        onChange={ handleChange }
      />
    </div>
  );
}
