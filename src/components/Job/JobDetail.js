import moment from 'moment';
import { Space, Row, Col, Typography, Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

// Utils & Constants
import {
  BUDGET_OPTION_LIST,
  POST_OPTION_LIST,
  CUSTOMER,
  DATE_FORMAT,
  TIME_FORMAT,
  FEE_RATE,
  CLEANING_OPTION_LIST,
  TYPE_CUSTOMER,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

const DescItem = ({ children, label }) => {
  return (
    <Space direction="vertical" size={[4, 0]}>
      <div className="text-gray">{label}</div>
      <div className="font-bold">{children}</div>
    </Space>
  );
};

export default ({ data, type }) => {
  return (
    <Row justify="center" gutter={[8, 8]}>
      <Col span={24}>
        <DescItem label="Job Title">{data.title}</DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Job Description">
          <Typography.Text>{data.description}</Typography.Text>
        </DescItem>
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ backgroundColor: CUSTOMER.backgroundColor }}>
          <Card.Grid
            style={{
              width: '100%',
              padding: 16,
              color: CUSTOMER.color,
              fontWeight: 900,
            }}
          >
            <EnvironmentOutlined className="mr-2" />
            {data.location}
          </Card.Grid>
          <Card.Grid
            style={{ width: '50%', padding: '8px 16px', color: CUSTOMER.color }}
          >
            <Space direction="vertical" size={4}>
              Date
              <div className="font-bold">
                {moment(data.date).format(DATE_FORMAT)}
              </div>
            </Space>
          </Card.Grid>
          <Card.Grid
            style={{ width: '50%', padding: '8px 16px', color: CUSTOMER.color }}
          >
            <Space direction="vertical" size={4}>
              Time
              <div className="font-bold">
                {moment(data.time).format(TIME_FORMAT)}
              </div>
            </Space>
          </Card.Grid>
        </Card>
      </Col>
      <Col span={24}>
        <DescItem label="Budget">
          {data.budget && BUDGET_OPTION_LIST[data.budget].label} - $
          {formatNumber(data.amount)}
        </DescItem>
      </Col>
      {type === TYPE_CUSTOMER && (
        <Col span={24}>
          <DescItem label="Service Charge (5%)">
            ${formatNumber((data.amount * FEE_RATE) / 100)}
          </DescItem>
        </Col>
      )}
      <Col span={24}>
        <DescItem label="Cleaning Details">
          {data.beds && data.beds.checked && `${data.beds.count} Bedroom `}
          {data.baths && data.baths.checked && `${data.baths.count} Bathroom`}
        </DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Supply Details">
          {data.supply && CLEANING_OPTION_LIST[data.supply].label}
        </DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Job Posting Options">
          {data.post && POST_OPTION_LIST[data.post].label}
        </DescItem>
      </Col>
    </Row>
  );
};
