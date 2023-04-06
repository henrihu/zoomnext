import { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

// Components
import Image from 'next/image';
import { List, Card, Divider, Row, Col, Tag, Button, Space } from 'antd';
import { DoubleRightOutlined, CloseOutlined } from '@ant-design/icons';

// Constants
import {
  JOB_STATUS,
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_PENDING,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

export default ({ total, page, data, onSetFilter }) => {
  const router = useRouter();
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      split
      renderItem={(item, index) => (
        <Card
          key={index}
          className={index === data.length - 1 ? 'mb-0' : 'mb-4'}
          bodyStyle={{
            padding: 0,
            borderRadius: 4,
            borderLeft: `6px solid ${
              JOB_STATUS[item.status] && JOB_STATUS[item.status].color
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
                  {moment(item.date).day()}
                </div>
                <span className="text-gray text-center">
                  {new Intl.DateTimeFormat('en', { month: 'short' })
                    .format(item.date)
                    .toUpperCase()}{' '}
                  {moment(item.date).year()}
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
            <Col xs={24} sm={24} md={18} className="flex items-center p-3">
              <Row className="w-full">
                <Col span={24} className="flex items-center">
                  <Space direction="vertical">
                    <Space>
                      <h2>{item.title}</h2>
                      <Tag
                        color={
                          JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].color
                        }
                      >
                        {JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].label}
                      </Tag>
                    </Space>
                    <span>{item.description}</span>
                  </Space>
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
                <Col span={24}>
                  <Row align="middle">
                    <Col span={12}>
                      <div
                        className="font-bold"
                        style={{ fontSize: 24, color: '#89CE9D' }}
                      >
                        ${formatNumber(item.price)}
                      </div>
                    </Col>
                    <Col span={12}>
                      {item.status === JOB_STATUS_PENDING && (
                        <span className="text-gray">Bids: {0}</span>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={3} className="p-3" justify="center">
              <Row className="w-full h-full" justify="center" align="stretch">
                <Col
                  xs={12}
                  sm={12}
                  md={24}
                  className="flex justify-center items-center p-1"
                >
                  <Button
                    icon={<DoubleRightOutlined />}
                    type="dashed"
                    shape="round"
                    size="small"
                    onClick={() => router.push(`/customer/jobs/${item.title}/`)}
                  >
                    Detail
                  </Button>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={24}
                  className="flex justify-center items-center p-1"
                >
                  <Button
                    shape="round"
                    size="small"
                    danger
                    icon={<CloseOutlined />}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
      pagination={{
        pageSize: 3,
        size: 'small',
        total,
        page,
        onChange: (page) => {
          onSetFilter({ page });
        },
      }}
    />
  );
};
