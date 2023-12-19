import { useState } from 'react';
import { useQuery } from 'react-query';
import { QueryOptions } from './grid-options';


function buildUrl(queryOptions: QueryOptions) {
  const { baseUrl } = queryOptions;
  const qs = buildPageQuery(queryOptions);

  const url = `${baseUrl}${qs}`;

  return url;
}

function buildPageQuery({ pageOptions, sortOptions, filterOptions }: QueryOptions) {
  const { page, size } = pageOptions;
  const [sortOption] = sortOptions || [];
  const { field, sort = 'asc' } = sortOption || {};
  const { filter } = filterOptions || {};

  const order = sort === 'desc' ? -1 : 1;

  console.log('sortOptions', sortOptions);

  let url = `?page=${page}&size=${size}`;

  url += field ? `&sort=${field}&order=${order}` : ``;
  url += filter ? `&filter=${filter}` : ``;

  console.log('url', url);

  return url;
}

export function useTraineeQuery(options: QueryOptions) {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ['trainee', buildPageQuery(options)],
    queryFn: async () => {
      const url = buildUrl(options);

      const response = await fetch(url);
      const result = await response.json();
      const { docs, totalDocs: rowCount } = result.data;

      setRows(docs);
      setRowCount(rowCount);

      return result;
    }
  });

  return { isLoading, isFetching, error, data, rows, rowCount };
}
