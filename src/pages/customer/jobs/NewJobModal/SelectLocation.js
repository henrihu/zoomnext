import { Button, Space, Card, Checkbox, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { TEMP_ADDRESS_DATE } from 'src/utils/constants';
import { useState } from 'react';
import SearchLocation from '@/components/SearchLocation';

export default ({ name = 'Location', value, onChange }) => {
  const [location, setLocation] = useState({});
  const [apt, setApt] = useState('');

  const handleChange = () => {};

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

        <div className="flex justify-between w-full gap-1">
          <div className="flex flex-col flex-1 gap-1">
            <span>{name}</span>
            <SearchLocation
              value={value}
              onChange={(location) => onChange({ ...value, location })}
            />
            {/* <small>{value && value.address}</small> */}
          </div>
          <Input
            style={{ width: 70 }}
            placeholder="Apt.#"
            onChange={(e) => onChange({ ...value, apt: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};
