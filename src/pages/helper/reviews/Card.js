import { Card, Row, Col, Space } from 'antd';
import { formatDate } from 'src/utils/common';
import { StarFilled } from '@ant-design/icons';

export default ({ data }) => {
  return (
    <Card hoverable size="small" bodyStyle={{ padding: 0 }}>
      <Row align="center">
        <Col
          span={3}
          className="flex flex-col justify-center items-center border-r-2 border-r-gray"
        >
          <div className="font-bold mb-1 text-2xl">
            <StarFilled style={{ color: '#FADB14' }} />
          </div>
          <div className="text-2xl font-bold">{data.providerRating}</div>
        </Col>
        <Col span={21} className="flex items-center px-4 md:px-8">
          <Space direction="vertical">
            <Space className="flex items-end">
              <h3>{data.title}</h3>
              <span className="text-gray">{data.RatingDate}</span>
            </Space>
            <span>{data.review}</span>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
