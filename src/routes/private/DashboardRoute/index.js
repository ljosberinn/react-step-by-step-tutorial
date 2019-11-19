import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { applyWithAnimationDelay } from '../../../utils';
import { Loader } from '../../../components';

const url = 'https://jsonplaceholder.typicode.com/posts';

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
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>id</th>
              <th>userId</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {data.map(function({ id, userId, title, body }) {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{userId}</td>
                  <td>{title.substring(0, 20)}</td>
                  <td>{body.substring(0, 20)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
