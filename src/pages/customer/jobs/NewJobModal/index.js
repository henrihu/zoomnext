import { useState, useMemo } from 'react';
import { Modal, Form, Divider, Row, Col, Steps, Button, Space } from 'antd';
import JobStep from './JobStep';
import ReviewStep from './ReviewStep';

export default ({ data, open, onOk, onCancel }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();
  const budget = Form.useWatch('budget', form);
  const amount = Form.useWatch('amount', form);
  const hour = Form.useWatch('hour', form);
  const estimateBudget = useMemo(() => {
    if (budget === 'total') return amount ? amount * 1.05 : 0;
    return amount && hour ? amount * hour * 1.05 : 0;
  }, [budget, amount, hour, step]);
  const STEP_ITEMS = {
    0: {
      title: 'Job',
      okText: 'Next',
      props: { form, budget, estimateBudget },
      onOk: () => {
        setStep(1);
        // form
        //   .validateFields()
        //   .then((v) => {
        //     setValues(v);
        //     setStep(1);
        //   })
        //   .catch((info) => {
        //     console.log('Validate Failed:', info);
        //   });
      },
      renderComponent: (props) => <JobStep {...props} />,
    },
    1: {
      title: 'Review',
      okText: 'Post Job',
      cancelText: 'Prev',
      onOk: () => {
        Modal.confirm({
          content: 'Confirm your post?',
          onOk: () => onOk(values),
        });
      },
      onCancel: () => {
        setStep(0);
      },
      renderComponent: (props) => <ReviewStep {...props} />,
    },
  };
  const modal_props = {
    title: 'Job Details',
    open,
    maskClosable: false,
    mask: false,
    closable: false,
    onCancel,
  };
  return (
    <Modal {...modal_props} footer={false}>
      <Divider />
      <Row justify="center">
        <Col span={16}>
          <Steps
            current={step}
            labelPlacement="vertical"
            items={Object.keys(STEP_ITEMS).map((key) => STEP_ITEMS[key])}
          />
        </Col>
        <Col span={24}>
          {STEP_ITEMS[step].renderComponent(STEP_ITEMS[step].props)}
        </Col>
        <Col span={24}>
          <Divider style={{ margin: '4px 0px' }} />
        </Col>
        <Col span={24}>
          <div className="flex justify-between items-end">
            <Space direction="vertical" size={4}>
              <h2>Estimate Budget</h2>
              <span className="text-gray">(Includes 5% processing fee)</span>
            </Space>
            <h1 className="font-bold">${estimateBudget}</h1>
          </div>
        </Col>
        <Col span={24} className="flex justify-end">
          <Space>
            {STEP_ITEMS[step].cancelText && (
              <Button onClick={STEP_ITEMS[step].onCancel}>
                {STEP_ITEMS[step].cancelText}
              </Button>
            )}
            <Button type="primary" onClick={STEP_ITEMS[step].onOk}>
              {STEP_ITEMS[step].okText}
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
    </Modal>
  );
};
