import { useState } from 'react';
import { Button, Row, Col, Select } from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

export default ({ filter, onSetFilter }) => {
  const [date, setDate] = useState('asc');
  const [totalPrice, setTotalPrice] = useState('asc');
  const [jobStatus, setJobStatus] = useState('all');
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
      <Col xs={8} sm={8} md={24}>
        <Select
          className="w-full text-center"
          value={jobStatus}
          onChange={(val) => {
            setJobStatus(val);
            onSetFilter({ jobStatus: val });
          }}
        >
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="open">open</Select.Option>
          <Select.Option value="close">close</Select.Option>
        </Select>
      </Col>
    </Row>
  );
};
