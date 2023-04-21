import { Card, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment';

import { CUSTOMER, DATE_FORMAT, TIME_FORMAT } from 'src/utils/constants';

export default ({ data }) => {
  return (
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
  );
};
