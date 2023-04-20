import { useState } from 'react';
import { Button, Row, Col } from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

export default ({ filter, onSetFilter }) => {
  const [date, setDate] = useState('asc');
  const [status, setStatus] = useState('asc');
  return (
    <Row gutter={[8, 8]}>
      <Col xs={8} sm={8} md={24}>
        <Button
          icon={
            date === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'jobDateAndTime' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = date === 'asc' ? 'desc' : 'asc';
            setDate(orderValue);
            onSetFilter({ orderKey: 'jobDateAndTime', orderValue });
          }}
        >
          Date
        </Button>
      </Col>
      <Col xs={8} sm={8} md={24}>
        <Button
          icon={
            status === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'status' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = status === 'asc' ? 'desc' : 'asc';
            setStatus(orderValue);
            onSetFilter({ orderKey: 'status', orderValue });
          }}
        >
          Status
        </Button>
      </Col>
    </Row>
  );
};
