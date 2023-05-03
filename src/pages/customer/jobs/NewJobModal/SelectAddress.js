import { useMemo } from 'react';

import { Form, Space, DatePicker, TimePicker } from 'antd';
import { ADDRESS_OPTION_PICKUP, TIME_FORMAT } from 'src/utils/constants';
import SelectLocation from './SelectLocation';

export default ({ type }) => {
  const showLabel = useMemo(
    () => (type === ADDRESS_OPTION_PICKUP ? 'Pick Up' : 'Drop Off'),
    [type]
  );
  return (
    <>
      <span className="font-bold mb-2">{showLabel} Date and Time</span>

      <Space.Compact block>
        <Form.Item
          label="Date"
          name={`${type}Date`}
          className="w-full"
          rules={[{ required: true, message: 'Please select date!' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          label="Time"
          name={`${type}Time`}
          className="w-full"
          rules={[{ required: true, message: 'Please select time!' }]}
        >
          <TimePicker className="w-full" minuteStep={15} format={TIME_FORMAT} />
        </Form.Item>
      </Space.Compact>

      <Form.Item
        name={`${type}Location`}
        rules={[
          {
            required: true,
            message: 'Please input your job description!',
          },
        ]}
      >
        <SelectLocation name={showLabel + ' Address'} prefix={type} />
      </Form.Item>
    </>
  );
};
