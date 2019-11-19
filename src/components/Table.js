import React, { useState } from 'react';
import Icon from './Icon';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const SORT_ORDER = {
  asc: 'ASC',
  desc: 'DESC',
};

export default function Table({
  rowItem: RowComponent,
  data,
  columns,
  setData,
}) {
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  function handleSortChange(columnName) {
    return function() {
      sortBy === columnName
        ? handleSortOrderChange()
        : handleSortByChange(columnName);
    };
  }

  function handleSortByChange(columnName) {
    setSortBy(columnName);

    const newData = [...data];
    newData.sort(function(a, b) {
      if (typeof a[columnName] === 'number') {
        return a[columnName] - b[columnName];
      }

      const propA = a[columnName].toUpperCase();
      const propB = b[columnName].toUpperCase();

      if (propA < propB) {
        return -1;
      }

      if (propA > propB) {
        return 1;
      }

      return 0;
    });

    setData(newData);
  }

  function handleSortOrderChange() {
    setSortOrder(
      sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC,
    );
    setData(data.reverse());
  }

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          {columns.map(function(column) {
            return (
              <th
                className='is-sortable'
                onClick={handleSortChange(column)}
                key={column}
              >
                {column}
                {sortBy === column && (
                  <Icon
                    icon={sortOrder === SORT_ORDER.ASC ? faSortUp : faSortDown}
                  />
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(function(dataset) {
          return <RowComponent dataset={dataset} key={dataset.id} />;
        })}
      </tbody>
    </table>
  );
}
