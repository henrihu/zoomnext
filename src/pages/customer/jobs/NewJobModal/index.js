import { useState, useMemo } from 'react';

// Components
import { Modal, Form, Divider, Row, Col, Steps, Button, Space } from 'antd';
import JobStep from './JobStep';
import ReviewStep from './ReviewStep';

// Utils & Constants
import { formatNumber } from 'src/utils/common';
import { BUDGET_OPTION_TOTAL_JOB, FEE_RATE } from 'src/utils/constants';

const calcBudget = (option, amount, hour) => {
  if (option === BUDGET_OPTION_TOTAL_JOB)
    return amount ? amount * (1 + FEE_RATE / 100) : 0;
  return amount && hour ? amount * hour * (1 + FEE_RATE / 100) : 0;
};

export default ({ data, open, onOk, onCancel }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();
  const budget = Form.useWatch('budget', form);
  const amount = Form.useWatch('amount', form);
  const hour = Form.useWatch('hour', form);
  const estimatedBudget = useMemo(() => {
    if (step === 0) {
      return calcBudget(budget, amount, hour);
    }
    return calcBudget(values.budget, values.amount, values.hour);
  }, [budget, amount, hour, step]);
  const STEP_ITEMS = {
    0: {
      title: 'Job',
      okText: 'Next',
      props: { form, budget },
      onOk: () => {
        setStep(1);
        const param = form.getFieldValue();
        const temp = {
          ...data,
          title: param.title,
          description: param.description,
          isHourly: param.isHourly === 'total' ? 0 : 1,
          isAllowBids: param.post === 'bid' ? 1 : 0,
          price: param.price,

          address: param.location,

          noOfHours: 3,
          latitude: 123,
          longtitude: 123,
          isBringSupplier: 1,

          numberOfBedrooms: param.beds.count,
          numberOfBathrooms: param.baths.count,
          isMyOwnSupplier: param.supply === 'have' ? 1 : 0,
          isBringYourSupplier: param.supply === 'bring' ? 1 : 0,
        };
        console.log(temp);
        console.log('param', param);
        setValues({ ...form.getFieldValue() });
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
      props: { data: values },
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
    onCancel,
  };
  return (
    <Modal {...modal_props} footer={false}>
      <Divider />
      <Row justify="center">
        <Col xs={24} sm={24} md={16}>
          <Steps
            current={step}
            labelPlacement="vertical"
            items={Object.keys(STEP_ITEMS).map((key) => STEP_ITEMS[key])}
            responsive={false}
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
            <div className="flex flex-col">
              <div style={{ fontSize: 20, fontWeight: 900 }}>
                Estimate Budget
              </div>
              <span className="text-gray">(Includes 5% processing fee)</span>
            </div>
            <h1 className="font-bold">${estimatedBudget}</h1>
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
    </Modal>
  );
};
