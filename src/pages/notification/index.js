import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Row, Col, List, Switch, Card } from 'antd';

// Actions
// import { getPaymentHistory } from 'src/store/common/actions';

const data = [
  { title: 'New Job Posted', status: true },
  { title: 'Message Received', status: true },
  { title: 'Job Bids Received', status: false },
  { title: 'Payment Charged', status: false },
  { title: 'Job Completed', status: true },
];

export default () => {
  //   const dispatch = useDispatch();
  //   const {
  //     payment_history: {
  //       data: { total, data },
  //       loading,
  //     },
  //   } = useSelector(({ payment }) => payment);

  //   useEffect(() => {
  //     dispatch(getPaymentHistory());
  //   }, []);

  return (
    <>
      <Meta
        title="Notification | Zoom Errands"
        description="Zoom Errands"
        label="Notifications"
      />
      <Space wrap className="w-full flex justify-center">
        {data.map(({ title, status }) => (
          <Card hoverable bodyStyle={{ width: 250 }}>
            <div className="flex justify-between items-center">
              <h3>{title}</h3>
              <Switch checked={status} />
            </div>
          </Card>
        ))}
      </Space>
    </>
  );
};
