import React, { useContext } from 'react';
import DataContext from '../context/myContext';
import TableContent from './tableContent';

export default function Table() {
  const { data } = useContext(DataContext);

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data && data.results
            .map((planet, index) => <TableContent key={ index } planet={ planet } />)}
        </tbody>
      </table>
    </div>
  );
}
