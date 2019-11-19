import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { applyWithAnimationDelay } from '../../../utils';
import { Loader, Icon } from '../../../components';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const url = 'https://jsonplaceholder.typicode.com/posts';

const COLUMNS = ['id', 'userId', 'title', 'body'];

const SORT_ORDER = {
  asc: 'ASC',
  desc: 'DESC',
};

export default function DashboardRoute() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  useEffect(function() {
    const start = Date.now();

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        applyWithAnimationDelay(
          start,
          function() {
            setData(json);
            setIsLoading(false);
          },
          1000,
        );
      });
  }, []);

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
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>

      {isLoading ? (
        <Loader isFullPage />
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              {COLUMNS.map(function(column) {
                return (
                  <th
                    className='is-sortable'
                    onClick={handleSortChange(column)}
                    key={column}
                  >
                    {column}
                    {sortBy === column && (
                      <Icon
                        icon={
                          sortOrder === SORT_ORDER.ASC ? faSortUp : faSortDown
                        }
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(function(dataset) {
              return (
                <tr key={dataset.id}>
                  {COLUMNS.map(function(column) {
                    return <td key={column}>{dataset[column]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
