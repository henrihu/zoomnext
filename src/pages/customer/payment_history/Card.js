import { Card, Row, Col, Space } from 'antd';
import moment from 'moment';
import { formatNumber } from 'src/utils/common';

// amount: 60;
// commission: 3;
// gift: 'Yes';
// id: 90;
// jobId: 61;
// jobSlug: '';
// totalPrice: '63';
// transactionCharge: 2.13;
// type: 'credit';
// userId: 6;

export default ({ data }) => {
  return (
    <Card hoverable size="small" bodyStyle={{ padding: 0 }}>
      <Row align="center">
        <Col
          span={3}
          className="flex flex-col justify-center items-center border-r-2 border-r-gray"
        >
          <div className="font-bold mb-1 text-3xl">
            {data && data.date.split(' ')[0]}
          </div>
          <span className="text-gray">{data && data.date.split(' ')[1]}</span>
          <span className="text-gray">{data && data.date.split(' ')[2]}</span>
        </Col>
        <Col span={15} className="flex items-center px-4 md:px-8">
          <Space direction="vertical">
            <h3>{data && data.title}</h3>
            <span>{data && data.description}</span>
          </Space>
        </Col>
        <Col span={6} className="flex items-center justify-end pr-3">
          <div className="font-bold" style={{ fontSize: 24, color: '#89CE9D' }}>
            ${formatNumber(data.totalPrice)}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
