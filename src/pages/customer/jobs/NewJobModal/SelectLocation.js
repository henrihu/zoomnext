import { Button, Space, Card, Checkbox } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { TEMP_ADDRESS_DATE } from 'src/utils/constants';

export default ({ name = 'Location', value, onChange }) => {
  return (
    <Card
      size="small"
      className="cursor-pointer"
      bodyStyle={{ border: '1px solid #d9d9d9', borderRadius: 6 }}
      onClick={() => onChange(TEMP_ADDRESS_DATE)}
    >
      <div className="flex items-center">
        <Button
          type="primary"
          icon={<EnvironmentOutlined />}
          className="mr-2"
          shape="circle"
        />
        <div className="flex flex-col">
          <span>{name}</span>
          <small>{value && value.address}</small>
        </div>
      </div>
    </Card>
  );
};
