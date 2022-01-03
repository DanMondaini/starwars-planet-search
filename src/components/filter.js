import React, { useState, useContext, useEffect } from 'react';
import MyContext from '../context/myContext';

export default function Filter() {
  const [query, setQuery] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const { planets, setTableArray, searchState, setSearchState } = useContext(MyContext);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const someFilter = (filter) => {
    const { filterByNumericValues } = searchState.filters;
    if (filterByNumericValues.length) {
      return filterByNumericValues.some((current) => {
        const isEqual = current.column === filter.column
        && current.comparison === filter.comparison
        && current.value === filter.value;
        return isEqual;
      });
    }
    return false;
  };

  const onClickFilter = () => {
    const newFilter = { column, comparison, value };
    if (!someFilter(newFilter)) {
      const index = columnOptions.findIndex((option) => option === column);
      columnOptions.splice(index, 1); // remove a option que foi selecionada
      setColumnOptions(columnOptions);

      searchState.filters.filterByNumericValues.push(newFilter);
      setSearchState(searchState); // faz o push do novo filtro

      const filtered = planets.filter((planet) => {
        if (planet[column] === 'unknown') return false;
        switch (comparison) {
        case 'menor que':
          return +planet[column] < +value;
        case 'maior que':
          return +planet[column] > +value;
        case 'igual a':
          return +planet[column] === +value;
        default:
          return false;
        }
      });

      setTableArray(filtered);
    }

    // O repositório consultado para resolução foi: https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/89/commits/d588f9228ac2211c496f59ea872b7c7cc7512fff
  };
  const handleChange = ({ target: { valor } }) => {
    setQuery(valor);
    searchState.filters.filterByName = valor;
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
  }, [searchState.filters.filterByName]);

  return (
    <form>

      <input
        data-testid="name-filter"
        type="text"
        value={ query }
        onChange={ handleChange }
      />

      <select
        data-testid="column-filter"
        name="column-filter"
        onChange={ ({ target }) => { setColumn(target.value); } }
      >
        { columnOptions
          .map((option) => <option key={ option } value={ option }>{ option }</option>) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => { setComparison(target.value); } }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => { setValue(target.value); } }
        value={ value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

// O requisito 2 foi feito com consulta ao repositorio do Nataniel Santos - link: https://github.com/tryber/sd-014-b-project-starwars-planets-search/pull/89/commits/7b9ee886245cfdf7db0e3bf41fddad43d3e5e30f
