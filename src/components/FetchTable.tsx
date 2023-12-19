// TableWithPagination.tsx
import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';

interface UserData {
  key: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

const FetchTable: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users?page=${page}&size=${pageSize}`);
      const result = await response.json();
      setData(result.data.docs);
      setPagination({
        ...pagination,
        total: result.data.totalDocs,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

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
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePaginationChange}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '57 ']}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default FetchTable;
