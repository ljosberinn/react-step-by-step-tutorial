import React, { useState, useEffect } from 'react';
import { Table, Loader } from '../../../components';
import Helmet from 'react-helmet';
import { applyWithAnimationDelay } from '../../../utils';

const COLUMNS = ['id', 'name', 'username', 'email', 'phone', 'website'];
const url = 'https://jsonplaceholder.typicode.com/users';

export default function UserRoute() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function() {
    const start = Date.now();

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        applyWithAnimationDelay(start, function() {
          setData(json);
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <h1>User</h1>

      {isLoading ? (
        <Loader isFullPage />
      ) : (
        <Table
          data={data}
          setData={setData}
          columns={COLUMNS}
          rowItem={UserRow}
        />
      )}
    </>
  );
}

function UserRow({ dataset }) {
  return (
    <tr>
      {COLUMNS.map(function(column) {
        const content = dataset[column];
        let newContent;

        switch (column) {
          case 'email':
            newContent = <a href={`mailto:${content}`}>{content}</a>;
            break;
          case 'phone':
            newContent = <a href={`tel:${content}`}>{content}</a>;
            break;
          case 'website':
            newContent = (
              <a
                href={`https://${content}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                {content}
              </a>
            );
            break;
          default:
            newContent = content;
        }

        return <td key={column}>{newContent}</td>;
      })}
    </tr>
  );
}
