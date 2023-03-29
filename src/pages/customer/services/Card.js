import { Card } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

export default ({ data }) => {
  return (
    <Card
      hoverable
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        width: 200,
        height: 150,
        margin: 16,
      }}
    >
      <GoogleOutlined style={{ fontSize: 60 }} />
      <h2 className="font-bold">{data.label}</h2>
    </Card>
  );
};
