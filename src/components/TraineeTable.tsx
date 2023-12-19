import React from 'react';
import { Table, Pagination } from 'antd';
import { useTraineeQuery } from './hook/useTraineeQuery';


const TraineeTable: React.FC = () => {

  const [pagination, setPagination] = React.useState({
    page: 1,
    size: 5,
  });

  const { isFetching, isLoading, rows, rowCount } = useTraineeQuery({
    baseUrl: 'http://localhost:3000/users',
    pageOptions: {
        page: pagination.page,
        size: pagination.size
      },
  });

  console.log(isFetching, isLoading, rows, rowCount);

  const handlePaginationChange = (page: number, size: number) => {
    setPagination({
      ...pagination,
      page: page,
    size: size,
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
      <Table dataSource={rows} columns={columns} loading={isLoading || isFetching} pagination={false} />
      <Pagination
        current={pagination.page}
        pageSize={pagination.size}
        total={rowCount}
        onChange={handlePaginationChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '50']}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default TraineeTable;
