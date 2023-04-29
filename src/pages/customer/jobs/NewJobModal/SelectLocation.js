import { Button, Space, Card, Checkbox, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { TEMP_ADDRESS_DATE } from 'src/utils/constants';
import { useState } from 'react';
import SearchLocation from '@/components/SearchLocation';

export default ({ name = 'Location', value, onChange }) => {
  const [location, setLocation] = useState({});
  const [apt, setApt] = useState('');
  return (
    <Card
      size="small"
      className="cursor-pointer"
      bodyStyle={{ border: '1px solid #d9d9d9', borderRadius: 6 }}
      onClick={() => onChange({ ...TEMP_ADDRESS_DATE, apt })}
    >
      <div className="flex items-center">
        <Button
          type="primary"
          icon={<EnvironmentOutlined />}
          className="mr-2"
          shape="circle"
        />
        <Space.Compact block>
          <SearchLocation value={value} onChange={onChange} />
          <Input style={{ width: 70 }} placeholder="Apt.#" />
        </Space.Compact>
        {/* <div className="flex flex-col">
          <span>{name}</span>
          <small>{value && value.address}</small>
        </div> */}
      </div>
    </Card>
  );
};
