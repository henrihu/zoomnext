import { Card, Row, Col, Space } from 'antd';
import moment from 'moment';
import { formatNumber } from 'src/utils/common';

export default ({ data }) => {
  if (!data) {
    return <Card>123</Card>;
  }
  return (
    <Card hoverable size="small" bodyStyle={{ padding: 0 }}>
      <Row align="center">
        <Col
          span={3}
          className="flex flex-col justify-center items-center border-r-2 border-r-gray"
        >
          <div className="font-bold mb-1 text-3xl">
            {moment(data.date).day()}
          </div>
          <span className="text-gray">
            {new Intl.DateTimeFormat('en', { month: 'short' })
              .format(data.date)
              .toUpperCase()}
          </span>
          <span className="text-gray">{moment(data.date).year()}</span>
        </Col>
        <Col span={15} className="flex items-center px-4 md:px-8">
          <Space direction="vertical">
            <h3>{data.title}</h3>
            <span>{data.description}</span>
          </Space>
        </Col>
        <Col span={6} className="flex items-center justify-end pr-3">
          <div className="font-bold" style={{ fontSize: 24, color: '#89CE9D' }}>
            ${formatNumber(data.price)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
