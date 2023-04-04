import { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

// Components
import Image from 'next/image';
import { List, Card, Descriptions, Row, Col, Tag, Button, Space } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

// Constants
import { JOB_STATUS } from 'src/utils/constants';

export default ({ data }) => {
  const router = useRouter();
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      split
      renderItem={(item, index) => (
        <Card
          key={index}
          className="mb-4"
          title={
            <div className="flex items-center justify-between">
              <div>{item.title}</div>
              <Button
                icon={<DoubleRightOutlined />}
                type="dashed"
                shape="round"
                size="small"
                onClick={() => router.push(`/customer/jobs/${item.title}/`)}
              >
                Detail
              </Button>
            </div>
          }
          headStyle={{
            borderLeft: `6px solid ${
              JOB_STATUS[item.status] && JOB_STATUS[item.status].color
            }`,
            cursor: 'default',
          }}
          bodyStyle={{
            borderLeft: `6px solid ${
              JOB_STATUS[item.status] && JOB_STATUS[item.status].color
            }`,
          }}
        >
          <Space className="flex flex-col sm:flex-row">
            <Card
              hoverable
              bodyStyle={{
                padding: 0,
                width: 150,
                height: 150,
                cursor: 'default',
              }}
            >
              <Image
                src="/images/service.png"
                alt="job"
                fill
                style={{ borderRadius: 8 }}
              />
            </Card>
            <Row gutter={[8, 8]}>
              <Col span={24} className="flex justify-center">
                <Descriptions bordered className="w-full">
                  <Descriptions.Item label="Date">
                    {moment(item.date).format('YYYY-MM-DD')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    ${item.price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <div
                      style={{
                        color:
                          JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].color,
                      }}
                    >
                      <Tag
                        color={
                          JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].color
                        }
                      >
                        {JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].label}
                      </Tag>
                    </div>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={24} className="flex justify-center">
                An open-source starter kit that will help you build full-stack
                multi-tenant SaaS platforms efficiently and help you focus on
                developing your core SaaS features. Built on top of popular and
                modern technologies such as Next JS, Tailwind, Prisma, and
                Stripe
              </Col>
            </Row>
          </Space>
        </Card>
      )}
      pagination={{}}
    />
  );
};
