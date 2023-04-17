import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Switch, Card } from 'antd';
import { emailNotificationUpdate } from 'src/store/common/actions';
import { useAuth } from 'src/store/auth/actions';

// Actions
// import { noti } from 'src/store/common/actions';

const data = [
  { key: 'isNewJob', title: 'New Job Posted' },
  { key: 'isSelecJob', title: 'isSelecJob' },
  { key: 'isMessageReceive', title: 'Message Received' },
  { key: 'isPaymentReceive', title: 'Payment Charged' },
  {
    key: 'isAppUpdatePermission',
    title: 'App Updated & Permission',
    status: true,
  },
  { key: 'isCompleteJob', title: 'Job Completed', status: true },
  { key: 'isJobBidReceivedByEmail', title: 'Job Bids Received', status: false },
  { key: 'isReviewReceivedByEmail', title: 'Review Received', status: false },
];

export default () => {
  const dispatch = useDispatch();
  const { userDetail } = useAuth();

  return (
    <>
      <Meta
        title="Notification | Zoom Errands"
        description="Zoom Errands"
        label="Notifications"
      />
      <Space wrap className="w-full flex justify-center">
        {data.map(({ key, title }) => (
          <Card hoverable bodyStyle={{ width: 320 }} key={key}>
            <div className="flex justify-between items-center">
              <h3>{title}</h3>
              <Switch
                checked={userDetail && userDetail[key]}
                onChange={() =>
                  dispatch(
                    emailNotificationUpdate(
                      data.reduce(
                        (res, cur) =>
                          cur.key === key
                            ? { ...res, [key]: 1 - userDetail[key] }
                            : { ...res, [cur.key]: userDetail[cur.key] },
                        {}
                      )
                    )
                  )
                }
              />
            </div>
          </Card>
        ))}
      </Space>
    </>
  );
};
