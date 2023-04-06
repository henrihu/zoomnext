import { Button, Space, Card, Checkbox } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

export default ({ name = 'Location', value, onChange }) => {
  return (
    <Card
      size="small"
      className="cursor-pointer"
      bodyStyle={{ border: '1px solid #d9d9d9', borderRadius: 6 }}
      onClick={() => onChange('My Location')}
    >
      <div className="flex items-center">
        <Button
          type="primary"
          icon={<EnvironmentOutlined />}
          className="mr-2"
          shape="circle"
        />
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span>{value}</span>
        </div>
      </div>
    </Card>
  );
};
