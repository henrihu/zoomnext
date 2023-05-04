import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

// Components
import { Modal, Form, Divider, Row, Col, Steps, Button, Space } from 'antd';
import JobStep from './JobStep';
import ReviewStep from './ReviewStep';

// Utils & Constants
import { calcBudget, MergeDateTime } from 'src/utils/common';
import {
  POST_OPTION_BID,
  CLEANING_OPTION_BRING,
  BUDGET_OPTION_HOURLY,
  CATEGORY_TYPE_CLEANING,
  CLEANING_OPTION_HAVE,
  CATEGORY_TYPE_DELIVERY,
} from 'src/utils/constants';

export default ({ data, open, onOk, onCancel }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();
  const budget = Form.useWatch('budget', form);
  const price = Form.useWatch('price', form);
  const hour = Form.useWatch('hour', form);

  const categoryType = useMemo(() => data && data.categoryType, [data]);

  const estimatedBudget = useMemo(() => {
    if (step === 0) {
      return calcBudget(budget, price, hour);
    }
    return calcBudget(values.budget, values.price, values.hour);
  }, [budget, price, hour, step]);

  const STEP_ACTIONS = {
    0: {
      onOk: () => {
        form.validateFields().then((values) => {
          const param = form.getFieldValue();
          let res = {
            ...data,
            ...param.location,
            ...param,
            isAllowBids: param.post === POST_OPTION_BID ? 1 : 0,
            jobDateAndTime: param.date,
            isHourly: param.budget === BUDGET_OPTION_HOURLY ? 1 : 0,
            noOfHours: param.budget === BUDGET_OPTION_HOURLY ? param.hour : 0,
          };
          if (categoryType === CATEGORY_TYPE_CLEANING) {
            const cleaning = {
              numberOfBedRooms: param.beds.count,
              numberOfBathrooms: param.baths.count,
              isMyOwnSupplier: param.supply === CLEANING_OPTION_HAVE ? 1 : 0,
              isBringYourSupplier:
                param.supply === CLEANING_OPTION_BRING ? 1 : 0,
            };
            res = { ...res, ...cleaning };
          }
          if (categoryType === CATEGORY_TYPE_DELIVERY) {
            res.pickUpDateAndTime = MergeDateTime(
              param.pickUpDate,
              param.pickUpTime
            );
            res = { ...res, ...param.pickUpLocation };
            res.pickUpaddress = res.pickUpAddress;

            //In case of delivery, job date and location is set by pickUp...
            res.jobDateAndTime = res.pickUpDateAndTime;

            res.dropOffDateAndTime = MergeDateTime(
              param.dropOffDate,
              param.dropOffTime
            );
            res = { ...res, ...param.dropOffLocation };
          } else {
            res.jobDateAndTime = MergeDateTime(param.date, param.time);
          }
          setValues(res);
          setStep(1);
        });
      },
    },
    1: {
      onOk: () => {
        Modal.confirm({
          content: 'Confirm your post?',
          centered: true,
          onOk: async () => {
            const res = await onOk(values);
            if (res !== false) {
              onCancel();
              router.push(`/customer/jobs`);
            }
          },
        });
      },
      onCancel: () => {
        setStep(0);
      },
    },
  };

  const STEP_ITEMS = {
    0: {
      title: 'Job',
      oktext: 'Next',
      props: { form, budget, type: categoryType },
    },
    1: {
      title: 'Review',
      oktext: 'Post Job',
      canceltext: 'Prev',
      props: { data: values, type: categoryType },
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
          {step === 0 && <JobStep {...STEP_ITEMS[step].props} />}
          {step === 1 && <ReviewStep {...STEP_ITEMS[step].props} />}
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
            {STEP_ITEMS[step].canceltext && (
              <Button onClick={STEP_ACTIONS[step].onCancel}>
                {STEP_ITEMS[step].canceltext}
              </Button>
            )}
            <Button type="primary" onClick={STEP_ACTIONS[step].onOk}>
              {STEP_ITEMS[step].oktext}
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
