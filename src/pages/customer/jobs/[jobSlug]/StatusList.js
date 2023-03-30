import { useState } from 'react';
import moment from 'moment';
import { Timeline, Row, Col, Button, Divider, InputNumber, Card } from 'antd';
import {
  ClockCircleOutlined,
  CalendarOutlined,
  CommentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ReviewModal from './ReviewModal';

const renderItem = (item) => (
  <Row>
    <Col span={24}>
      <h3>{item.title}</h3>
    </Col>
    <Col span={24} className="flex items-center">
      <CalendarOutlined className="mr-2" />
      {moment().format('YYYY-MM-DD')}
    </Col>
    <Col span={24} className="flex items-center">
      <ClockCircleOutlined className="mr-2" />
      {moment().format('hh:mm ')}
    </Col>
  </Row>
);

export default () => {
  const [tip_amount, setTipAmount] = useState();
  const [modal, setModal] = useState({ open: false });
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <h1>Status</h1>
      </Col>
      <Col span={24}>
        <Timeline
          mode="left"
          items={[
            {
              children: renderItem({ title: 'Task Accepted on' }),
            },
            {
              children: renderItem({
                title: 'Provider Reach On Your Place On',
              }),
            },
            {
              children: renderItem({ title: 'Provider Has Start Task' }),
            },
            {
              color: 'gray',
              children: <h3 style={{ color: 'gray' }}>Finish</h3>,
            },
          ]}
        />
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          size="large"
          shape="round"
          className="mr-4"
          onClick={() => setModal({ open: true })}
        >
          Complete Job
        </Button>
        <Button type="primary" size="large" shape="round">
          Location on Map
        </Button>
      </Col>
      <ReviewModal
        {...modal}
        onOk={() => setModal({ open: false })}
        onCancel={() => setModal({ open: false })}
      />
      {/* <Col span={24}>
        <Card size="small" hoverable>
          <Row className="w-full">
            <Col span={12} className="flex items-center">
              <CommentOutlined
                style={{ fontSize: 45, marginRight: 16, color: 'gray' }}
              />
              <div className="flex flex-col items-center">
                <div className="mb-2">Hope you have with provider work?</div>
                <div>You want to give tip to provider?</div>
              </div>
            </Col>
            <Col span={12} className="flex items-center justify-center">
              <InputNumber
                value={tip_amount}
                min={0}
                maxLength={10}
                onChange={(value) => setTipAmount(value)}
                className="mr-4"
                placeholder="Add Tip Amount"
                style={{ minWidth: 150 }}
              />
              <Button
                type="primary"
                shape="round"
                disabled={!tip_amount || tip_amount <= 0}
              >
                Give Tip
              </Button>
            </Col>
          </Row>
        </Card>
      </Col> */}
    </Row>
  );
};
