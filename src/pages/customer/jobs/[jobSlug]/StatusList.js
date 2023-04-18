import { useState } from 'react';
import moment from 'moment';
import { Timeline, Row, Col, Button } from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import ReviewModal from './ReviewModal';

const renderItem = (item) => (
  <Row>
    <Col span={24}>
      <h3>{item.title}</h3>
    </Col>
    <Col span={24} className="flex items-center">
      <CalendarOutlined className="mr-2" />
      {item.date}
    </Col>
    <Col span={24} className="flex items-center">
      <ClockCircleOutlined className="mr-2" />
      {item.time}
    </Col>
  </Row>
);

export default ({ data = [] }) => {
  const [modal, setModal] = useState({ open: false });
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <h1>Status</h1>
      </Col>
      <Col span={24}>
        <Timeline
          mode="left"
          items={data.map((item) => {
            return { children: renderItem(item) };
          })}
          // items={[...data,
          //   {
          //     children: renderItem({ title: 'Task Accepted on' }),
          //   },
          //   {
          //     children: renderItem({
          //       title: 'Provider Reach On Your Place On',
          //     }),
          //   },
          //   {
          //     children: renderItem({ title: 'Provider Has Start Task' }),
          //   },
          //   {
          //     color: 'gray',
          //     children: <h3 className="text-gray">Finish</h3>,
          //   },
          // ]}
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
    </Row>
  );
};
