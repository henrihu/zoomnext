import moment from 'moment';

// Components
import { Card, Divider, Row, Col, Tag, Button, Space } from 'antd';
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';

// Constants
import {
  JOB_STATUS,
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_CANCEL,
  JOB_STATUS_COMPLETE,
  JOB_STATUS_PENDING,
  TYPE_CUSTOMER,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';
import { useMemo } from 'react';

export default ({ data, type, onDetail, onCancel, parent }) => {
  const isCancel = useMemo(
    () =>
      (parent === 'customerJobs' || parent === 'providerJobs') &&
      data.status !== JOB_STATUS_COMPLETE &&
      data.status !== JOB_STATUS_CANCEL,
    [parent, data]
  );
  return (
    <Card bodyStyle={{ padding: 0, borderRadius: 8 }} hoverable>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={3}
          className="flex flex-col justify-center items-center md:border-r-2 md:border-r-gray gap-1 px-4 py-2"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold mb-1 text-3xl">
              {moment(data.jobDateAndTime).date()}
            </div>
            <span className="text-gray text-center">
              {new Intl.DateTimeFormat('en', { month: 'short' })
                .format(moment(data.jobDateAndTime))
                .toUpperCase()}{' '}
              {moment(data.jobDateAndTime).year()}
            </span>
          </div>
          <Card
            hoverable
            bodyStyle={{
              padding: 0,
              cursor: 'default',
              maxHeight: 100,
              maxWidth: 100,
            }}
          >
            <img
              src={data.avatarImage}
              alt="avatar"
              width="100%"
              height="100%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={21} className="flex items-center p-3">
          <Row className="w-full">
            <Col span={24} className="flex justify-between items-center">
              <Space direction="vertical">
                <Space>
                  <h2>{data.title}</h2>
                  <Tag
                    color={
                      JOB_STATUS[data.status] && JOB_STATUS[data.status].color
                    }
                  >
                    {JOB_STATUS[data.status] && JOB_STATUS[data.status].label}
                  </Tag>
                </Space>
                <span>{data.description}</span>
              </Space>
              <Button
                icon={<DoubleRightOutlined />}
                type="dashed"
                shape="round"
                size="small"
                onClick={onDetail}
              >
                Detail
              </Button>
            </Col>
            <Col span={24}>
              <Divider className="my-4" />
            </Col>
            <Col span={24}>
              <Row align="middle">
                <Col span={12}>
                  <div
                    className="font-bold"
                    style={{ fontSize: 24, color: '#89CE9D' }}
                  >
                    $
                    {formatNumber(
                      type === TYPE_CUSTOMER
                        ? data.totalCustomerPrice
                        : data.totalPrice
                    )}
                  </div>
                </Col>
                <Col span={6}>
                  {type === TYPE_CUSTOMER &&
                    data.status === JOB_STATUS_PENDING && (
                      <span className="text-gray">Bids: {data.bidCount}</span>
                    )}
                </Col>
                {isCancel && (
                  <Col span={6} className="flex justify-end">
                    <Button
                      shape="round"
                      size="small"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => onCancel({ jobId: data.id })}
                    >
                      {type === TYPE_CUSTOMER ? 'Close' : 'Cancel'}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
