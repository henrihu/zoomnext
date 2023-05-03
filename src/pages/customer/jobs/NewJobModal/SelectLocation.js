import { Button, Card, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import SearchLocation from '@/components/SearchLocation';

export default ({ name = 'Location', value, onChange, prefix }) => {
  return (
    <Card
      size="small"
      className="cursor-pointer"
      bodyStyle={{ border: '1px solid #d9d9d9', borderRadius: 6 }}
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
              prefix={prefix}
              onChange={(location) => onChange({ ...value, ...location })}
            />
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
