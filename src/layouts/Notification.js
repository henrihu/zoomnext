import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  Space,
  Badge,
  Divider,
  Empty,
  Avatar,
  Button,
  Spin,
} from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { setNotificationDrawer } from 'src/store/setting/actions';
import { setData as setAuthData } from 'src/store/auth/actions';
import {
  getNotificationList,
  initStore,
  removeNotification,
} from 'src/store/common/actions';

export default () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const {
    notification_list: { data, loading },
    pending,
  } = useSelector(({ common }) => common);
  const { notification_drawer } = useSelector(({ setting }) => setting);

  useEffect(() => {
    if (notification_drawer) {
      dispatch(setAuthData({ notificationCount: 0 }));
    } else {
      dispatch(initStore('notification_list'));
      setPagination({ page: 1, perPage: 10 });
    }
  }, [notification_drawer]);

  useEffect(() => {
    if (notification_drawer) {
      dispatch(getNotificationList(pagination));
    }
  }, [notification_drawer, pagination]);
  return (
    <Drawer
      title="Notifications"
      open={notification_drawer}
      onClose={() => dispatch(setNotificationDrawer(false))}
      width={300}
    >
      <Space direction="vertical" className="w-full">
        <Spin spinning={loading}>
          {data && data.notifications && data.notifications.length ? (
            data.notifications.map(
              ({ title, notificationTime, isRead, id }, index) => (
                <div key={index}>
                  <div className="flex items-center w-full gap-4">
                    <Avatar
                      src={data.profileImage}
                      width={20}
                      height={20}
                      className="rounded"
                      alt="noti"
                    />
                    <div className="flex justify-between items-center w-full">
                      <Space direction="vertical" size={1}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: title,
                          }}
                        />
                        <span className="text-gray text-xs">
                          {notificationTime}
                        </span>
                      </Space>
                      <div className="flex items-center">
                        {isRead ? (
                          <Badge dot={true} status="processing" />
                        ) : (
                          <></>
                        )}
                        <Button
                          icon={<CloseOutlined />}
                          shape="circle"
                          size="small"
                          type="text"
                          loading={
                            pending && pending[`removeNotification${id}`]
                          }
                          onClick={() => dispatch(removeNotification(id))}
                        />
                      </div>
                    </div>
                  </div>
                  <Divider className="my-1" />
                </div>
              )
            )
          ) : (
            <Empty />
          )}
        </Spin>
        {data && data.hasMore ? (
          <Button
            size="small"
            icon={<DownOutlined />}
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page + 1 })
            }
            loading={loading}
          >
            Load More
          </Button>
        ) : (
          <></>
        )}
      </Space>
    </Drawer>
  );
};
