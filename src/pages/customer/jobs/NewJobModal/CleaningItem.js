import { Button, Space, Card, Checkbox } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default ({ name, value: { count, checked }, onChange }) => {
  return (
    <Card
      size="small"
      className="cursor-default"
      bodyStyle={{ border: '1px solid #d9d9d9', borderRadius: 6 }}
    >
      <div className="flex justify-between items-center">
        <Checkbox
          checked={checked}
          onChange={(e) => onChange({ checked: e.target.checked, count })}
        >
          {name}
        </Checkbox>
        <Space>
          <Button
            shape="circle"
            size="small"
            icon={<MinusOutlined />}
            disabled={count === 1 || !checked}
            onClick={() => {
              onChange({ checked, count: count - 1 });
            }}
          />
          <div>{count}</div>
          <Button
            type="primary"
            shape="circle"
            size="small"
            disabled={!checked}
            icon={<PlusOutlined />}
            onClick={() => {
              onChange({ checked, count: count + 1 });
            }}
          />
        </Space>
      </div>
    </Card>
  );
};
