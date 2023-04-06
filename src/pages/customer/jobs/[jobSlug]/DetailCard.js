import moment from 'moment';
import { useRouter } from 'next/router';

// Components
import { Card, Row, Col, Tag, Button } from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

// Constants
import { JOB_STATUS, JOB_STATUS_ASSIGNED } from 'src/utils/constants';

export default ({ data, loading }) => {
  const router = useRouter();
  return (
    <Card
      className="mb-4"
      loading={loading}
      title={
        <div className="flex items-center justify-between">
          <div>{data.title}</div>
          <div
            style={{
              color: JOB_STATUS[data.status] && JOB_STATUS[data.status].color,
            }}
          >
            <Tag
              color={JOB_STATUS[data.status] && JOB_STATUS[data.status].color}
            >
              {JOB_STATUS[data.status] && JOB_STATUS[data.status].label}
            </Tag>
          </div>
        </div>
      }
      headStyle={{
        borderLeft: `6px solid ${
          JOB_STATUS[data.status] && JOB_STATUS[data.status].color
        }`,
        cursor: 'default',
      }}
      bodyStyle={{
        borderLeft: `6px solid ${
          JOB_STATUS[data.status] && JOB_STATUS[data.status].color
        }`,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24} className="flex justify-center">
          An open-source starter kit that will help you build full-stack
          multi-tenant SaaS platforms efficiently and help you focus on
          developing your core SaaS features. Built on top of popular and modern
          technologies such as Next JS, Tailwind, Prisma, and Stripe
        </Col>
        <Col span={24} className="flex items-center">
          <h3>
            <CalendarOutlined className="mr-2" />
          </h3>
          <h3>{moment(data.date).format('YYYY-MM-DD')}</h3>
        </Col>
        <Col span={24} className="flex items-center">
          <h3>
            <EnvironmentOutlined className="mr-2" />
          </h3>
          <h3>{data && data.location}</h3>
        </Col>
        {data && data.status === JOB_STATUS_ASSIGNED && (
          <Col span={24}>
            <Button
              icon={<PlusOutlined />}
              shape="round"
              size="small"
              type="primary"
            >
              Add More Work
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};
