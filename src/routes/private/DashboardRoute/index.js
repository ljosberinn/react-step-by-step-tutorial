import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { applyWithAnimationDelay } from '../../../utils';
import { Loader, Table } from '../../../components';

const url = 'https://jsonplaceholder.typicode.com/posts';

const COLUMNS = ['id', 'userId', 'title', 'body'];

export default function DashboardRoute() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>

      {isLoading ? (
        <Loader isFullPage />
      ) : (
        <Table
          rowItem={PostRow}
          data={data}
          setData={setData}
          columns={COLUMNS}
        />
      )}
    </>
  );
}

function PostRow({ dataset }) {
  return (
    <tr>
      {COLUMNS.map(function(column) {
        return <td key={column}>{dataset[column]}</td>;
      })}
    </tr>
  );
}
