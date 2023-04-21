import moment from 'moment';
import { useRouter } from 'next/router';

// Components
import { Card, Row, Col, Tag } from 'antd';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

// Constants
import { JOB_STATUS } from 'src/utils/constants';

export default ({ data, loading }) => {
  const router = useRouter();
  return (
    <Card
      className="mb-4"
      loading={loading}
      hoverable
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
      headStyle={{ cursor: 'default' }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24} className="flex justify-center">
          {data && data.description}
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
          <h3>{data && data.address}</h3>
        </Col>
      </Row>
    </Card>
  );
};
