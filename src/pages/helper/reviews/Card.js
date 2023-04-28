import { Card, Row, Col, Space, Tag, Divider } from 'antd';
import { formatDate, formatNumber } from 'src/utils/common';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';

export default ({ data }) => {
  return (
    <Card hoverable size="small" bodyStyle={{ padding: 0 }}>
      <Row align="center">
        <Col
          span={3}
          className="flex flex-col justify-center items-center border-r-2 border-r-gray"
        >
          <div className="font-bold mb-1 text-2xl">
            <StarFilled className="star-blue" />
          </div>
          <div className="text-lg font-bold">
            {formatNumber(data.providerRating, 1)}
          </div>
        </Col>
        <Col span={21} className="flex items-center px-4 md:px-8 py-2">
          <Space direction="vertical">
            <Space size={[0, 2]} direction="vertical">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{`${data.title} `}</h3>
                <small className="text-gray italic">
                  ({data.RatingDate.replace(data.title, '')})
                </small>
              </div>
            </Space>
            <span className="disp-text">{data.ratingDesc}</span>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
