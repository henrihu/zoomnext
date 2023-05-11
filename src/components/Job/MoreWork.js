import { Card, Button, Row, Col, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  JOB_STATUS,
  TYPE_CUSTOMER,
  JOB_STATUS_COMPLETE,
  FEE_RATE,
} from 'src/utils/constants';
import MoreWorkModal from './MoreWorkModal';
import { useState } from 'react';

export default ({ jobId, data, type, status, onCreate = () => {} }) => {
  const [modal, setModal] = useState({ open: false });
  return (
    <Card hoverable title={<h3>Added More Work</h3>}>
      <Row gutter={[8, 8]}>
        {data &&
          data.map((item, index) => (
            <Col key={index} span={24}>
              <Card size="small" hoverable>
                <div className="flex flex-auto justify-between items-center w-full">
                  <Row gutter={[0, 0]} className="w-full">
                    <Col span={24}>
                      <Space className="w-full" direction="vertical" size={2}>
                        <Space
                          className="w-full"
                          direction="vertical"
                          size={[2, 0]}
                        >
                          <div className="font-bold">{item.description}</div>

                          <div className="text-gray">
                            {item.isHourly
                              ? `Hourly $${item.price}  ${item.noOfHours} hours`
                              : `Total Job $${item.price}`}
                          </div>
                        </Space>
                        <Tag
                          size="small"
                          color={
                            JOB_STATUS[item.status] &&
                            JOB_STATUS[item.status].color
                          }
                        >
                          {JOB_STATUS[item.status] &&
                            JOB_STATUS[item.status].label}
                        </Tag>
                      </Space>
                    </Col>
                  </Row>
                  <h2 style={{ color: '#87CD9B' }}>
                    $
                    {type === TYPE_CUSTOMER
                      ? (item.totalPrice * (100 + FEE_RATE)) / 100
                      : item.totalPrice}
                  </h2>
                </div>
              </Card>
            </Col>
          ))}
        {type === TYPE_CUSTOMER && status !== JOB_STATUS_COMPLETE && (
          <Col span={24} className="flex justify-center">
            <Button
              icon={<PlusOutlined />}
              shape="round"
              size="small"
              type="primary"
              onClick={() => {
                setModal({ open: true, jobId: jobId });
              }}
            >
              Add More Work
            </Button>
            <MoreWorkModal
              {...modal}
              onOk={onCreate}
              onCancel={() => setModal({ open: false })}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};
