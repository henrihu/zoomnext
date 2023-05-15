import { Card, Row, Col, Space } from 'antd';
import { useAuth } from 'src/store/auth/actions';
import { formatNumber } from 'src/utils/common';
import { TYPE_CUSTOMER } from 'src/utils/constants';

export default ({ data }) => {
  const { type } = useAuth();
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
        <Col xs={21} sm={21} md={15} className="flex items-center px-4 md:px-8">
          <Space direction="vertical">
            <h3>{data && data.title}</h3>
            <span>{data && data.description}</span>
          </Space>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={6}
          className="flex flex-col justify-center items-end md:items-center border-t-2 border-t-gray md:border-t-0 pr-4 md:pr-0"
        >
          <div className="font-bold text-2xl" style={{ color: '#89CE9D' }}>
            ${formatNumber(data.totalPrice)}
          </div>
          {type === TYPE_CUSTOMER && (
            <div className="flex justify-between font-bold text-lg text-gray mt-1">
              <div>${formatNumber(data.amount)}</div> +{' '}
              <div>${formatNumber(data.commission)}</div>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};
