import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { Drawer, Space, Badge, Divider, Empty } from 'antd';
import { DATE_FORMAT } from 'src/utils/constants';
import moment from 'moment';
import { setNotificationDrawer } from 'src/store/setting/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    notification_list: { data, loading },
  } = useSelector(({ common }) => common);
  const { notification_drawer } = useSelector(({ setting }) => setting);
  return (
    <Drawer
      title="Notifications"
      open={notification_drawer}
      onClose={() => dispatch(setNotificationDrawer(false))}
    >
      <Space direction="vertical" className="w-full">
        {data && data.length ? (
          data.map(({ title, date, status }, index) => (
            <div key={index}>
              <div className="flex items-center w-full gap-4">
                <Image
                  src="/images/service.png"
                  width={20}
                  height={20}
                  className="rounded"
                  alt="noti"
                />
                <div className="flex justify-between items-center w-full">
                  <Space direction="vertical" size={1}>
                    <h3>{title}</h3>
                    <span className="text-gray">
                      {moment(date).format(DATE_FORMAT)}
                    </span>
                  </Space>
                  {status ? <Badge dot={true} status="processing" /> : <></>}
                </div>
              </div>
              <Divider className="my-1" />
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Space>
    </Drawer>
  );
};
