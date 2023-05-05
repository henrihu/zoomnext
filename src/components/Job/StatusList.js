import { useState } from 'react';
import { Timeline, Row, Col, Button, Card, Divider } from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';

import ReviewModal from './ReviewModal';
import {
  CATEGORY_TYPE_DELIVERY,
  JOB_STATUS_COMPLETE,
  JOB_STATUS_HISTORY_LABEL,
} from 'src/utils/constants';
import LocationModal from './LocationModal';
import { useRouter } from 'next/router';

const renderItem = (item) => (
  <Row>
    <Col span={24}>
      <h3>{JOB_STATUS_HISTORY_LABEL[item.status]}</h3>
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

export default ({ data, completeJob }) => {
  const [reviewModal, setReviewModal] = useState({ open: false });
  const [locationModal, setLocationModal] = useState({ open: false });
  const router = useRouter();

  return (
    <Card hoverable title={<h3>Status</h3>}>
      <Row gutter={[16, 0]}>
        <Col span={24}>
          {data && data.jobStatusHistory && (
            <Timeline
              mode="left"
              items={[
                ...data.jobStatusHistory.map((item) => {
                  return { children: renderItem(item) };
                }),
                data.status === JOB_STATUS_COMPLETE && {
                  color: 'gray',
                  children: <h3 className="text-gray">Finish</h3>,
                },
              ]}
            />
          )}
        </Col>
        {data && data.status !== JOB_STATUS_COMPLETE && (
          <>
            <Col span={24} className="flex justify-center">
              <Button
                type="primary"
                shape="round"
                className="mr-4 mb-2"
                onClick={() => setReviewModal({ open: true, data })}
              >
                Complete Job
              </Button>
              {data.type === CATEGORY_TYPE_DELIVERY && (
                <Button
                  type="primary"
                  shape="round"
                  className="mb-2"
                  onClick={() => setLocationModal({ open: true })}
                >
                  Location on Map
                </Button>
              )}
            </Col>
          </>
        )}
      </Row>
      <ReviewModal
        {...reviewModal}
        onOk={completeJob}
        onCancel={() => setReviewModal({ open: false })}
      />
      <LocationModal
        onCancel={() => setLocationModal({ open: false })}
        data={data}
        {...locationModal}
      />
    </Card>
  );
};
