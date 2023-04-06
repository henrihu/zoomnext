import { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

// Components
import Image from 'next/image';
import { Card, Divider, Row, Col, Tag, Button, Space } from 'antd';
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';

// Constants
import {
  JOB_STATUS,
  JOB_STATUS_PENDING,
  TYPE_CUSTOMER,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

export default ({ data, type, onDetail, onCancel }) => {
  const router = useRouter();
  return (
    <Card
      bodyStyle={{
        padding: 0,
        borderRadius: 8,
        borderLeft: `6px solid ${
          JOB_STATUS[data.status] && JOB_STATUS[data.status].color
        }`,
      }}
    >
      <Row>
        <Col
          xs={24}
          sm={24}
          md={3}
          className="flex flex-col justify-center items-center md:border-r-2 md:border-r-gray gap-1 px-3 py-1"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold mb-1 text-3xl">
              {moment(data.date).day()}
            </div>
            <span className="text-gray text-center">
              {new Intl.DateTimeFormat('en', { month: 'short' })
                .format(data.date)
                .toUpperCase()}{' '}
              {moment(data.date).year()}
            </span>
          </div>
          <Card hoverable bodyStyle={{ padding: 0, cursor: 'default' }}>
            <img
              src="/images/service.png"
              alt="job"
              width="100%"
              height="100%"
              className="rounded-lg"
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
                    ${formatNumber(data.price)}
                  </div>
                </Col>
                <Col span={6}>
                  {type === TYPE_CUSTOMER &&
                    data.status === JOB_STATUS_PENDING && (
                      <span className="text-gray">Bids: {0}</span>
                    )}
                </Col>
                <Col span={6} className="flex justify-end">
                  <Button
                    shape="round"
                    size="small"
                    danger
                    icon={<CloseOutlined />}
                    onClick={onCancel}
                  >
                    {type === TYPE_CUSTOMER ? 'Close' : 'Cancel'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
