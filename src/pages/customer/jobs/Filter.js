import { useState } from 'react';
import { Button, Radio, Row, Col } from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

export default ({ filter, onSetFilter }) => {
  const [date, setDate] = useState('asc');
  const [totalPrice, setTotalPrice] = useState('asc');
  return (
    <Row gutter={8}>
      <Col span={6}>
        <Button
          icon={
            date === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'date' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = date === 'asc' ? 'desc' : 'asc';
            setDate(orderValue);
            onSetFilter({ orderKey: 'date', orderValue });
          }}
        >
          Date
        </Button>
      </Col>
      <Col span={6}>
        <Button
          icon={
            totalPrice === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'totalPrice' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = totalPrice === 'asc' ? 'desc' : 'asc';
            setTotalPrice(orderValue);
            onSetFilter({ orderKey: 'totalPrice', orderValue });
          }}
        >
          Price
        </Button>
      </Col>
      <Col span={6}>
        <Button icon={<SortAscendingOutlined />} className="w-full">
          Location
        </Button>
      </Col>
    </Row>
  );
};
