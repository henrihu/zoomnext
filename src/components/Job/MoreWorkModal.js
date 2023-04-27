import { Modal, Divider, Row, Col, Input, Radio, InputNumber } from 'antd';
import { useState } from 'react';
import { calcBudget } from 'src/utils/common';
import {
  BUDGET_OPTION_HOURLY,
  BUDGET_OPTION_LIST,
  BUDGET_OPTION_TOTAL_JOB,
  FEE_RATE,
} from 'src/utils/constants';

export default ({ jobId, open, onOk, onCancel }) => {
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTION_TOTAL_JOB);
  const [price, setPrice] = useState();
  const [hour, setHour] = useState(0);
  const modal_props = {
    title: 'Add More Work',
    open,
    okText: 'Done',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: async () => {
      const isSuccess = await onOk({
        jobId,
        description,
        price,
        noOfHours: hour,
        isHourly: budget === BUDGET_OPTION_HOURLY ? 1 : 0,
      });
      if (isSuccess) {
        onCancel();
      }
    },
    onCancel,
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={description}
            placeholder="Job Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <div className="font-bold text-lg mb-2">Budget</div>
          <div>
            <Radio.Group
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              {Object.keys(BUDGET_OPTION_LIST).map((key) => (
                <Radio value={key} key={key}>
                  {BUDGET_OPTION_LIST[key].label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </Col>
        <Col span={24}>
          <Row gutter={8}>
            <Col span={budget === BUDGET_OPTION_HOURLY ? 12 : 24}>
              <InputNumber
                addonBefore="$"
                addonAfter={budget === BUDGET_OPTION_HOURLY && '/hr'}
                className="w-full"
                value={price}
                onChange={(value) => setPrice(value)}
              />
            </Col>
            {budget === BUDGET_OPTION_HOURLY && (
              <Col span={12}>
                <InputNumber
                  addonAfter="hours"
                  className="w-full"
                  value={hour}
                  onChange={(value) => setHour(value)}
                />
              </Col>
            )}
          </Row>
          <span className="text-gray">
            Note: ({FEE_RATE}% processing fee will be applied)
          </span>
        </Col>
        <Col span={24}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="font-bold text-lg">Estimate Budget</div>
            </div>
            <h1 className="font-bold">${calcBudget(budget, price, hour)}</h1>
          </div>
        </Col>
      </Row>

      <Divider className="my-2" />
    </Modal>
  );
};
