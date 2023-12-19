import React from 'react';
import { useQuery } from 'react-query';
import { Table, Pagination } from 'antd';

const fetchData = async (page: number, pageSize: number) => {
  const response = await fetch(`http://localhost:3000/users?page=${page}&size=${pageSize}`);
  const result = await response.json();
  return result.data;
};

const QueryTable: React.FC = () => {

  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { data, isLoading } = useQuery(['userData', pagination.current, pagination.pageSize], () =>
    fetchData(pagination.current, pagination.pageSize)
  );

  console.log(data, isLoading, pagination);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
    });
  };

  const columns = [
    {
      title: 'First name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div>
      <Table dataSource={data?.docs} columns={columns} loading={isLoading} pagination={false} />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={data?.totalDocs}
        onChange={handlePaginationChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '50']}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default QueryTable;
