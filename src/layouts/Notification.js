import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Space, Badge, Divider, Empty, Button, Spin, Card } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import {
  CloseOutlined,
  DownOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { setNotificationDrawer } from 'src/store/setting/actions';
import { setData as setAuthData } from 'src/store/auth/actions';
import {
  getNotificationList,
  initStore,
  removeNotification,
} from 'src/store/common/actions';
import { useThemeToken } from 'src/utils/common';

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
      title={
        <h3 className="font-bold text-white flex items-center gap-2">
          <BellOutlined />
          Notifications
        </h3>
      }
      open={notification_drawer}
      onClose={() => dispatch(setNotificationDrawer(false))}
      width={350}
      closable={false}
      bodyStyle={{ padding: '16px 0px' }}
      headerStyle={{
        backgroundColor: useThemeToken().colorPrimary,
        color: 'white',
      }}
    >
      <Space direction="vertical" className="w-full">
        <Spin spinning={loading}>
          {data && data.notifications && data.notifications.length ? (
            data.notifications.map(
              ({ title, notificationTime, isRead, id }, index) => (
                <div key={index} className="mb-2">
                  <Card hoverable size="small">
                    <div className="flex justify-between">
                      <Space direction="vertical" size={1}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: title,
                          }}
                        />
                        <div className="flex gap-2">
                          <CalendarOutlined className="text-gray text-xs" />
                          <span className="text-gray text-xs">
                            {notificationTime}
                          </span>
                        </div>
                      </Space>
                      <div className="flex items-center">
                        {!isRead ? (
                          <Badge dot={true} status="processing" />
                        ) : (
                          <></>
                        )}
                        <Button
                          icon={<CloseOutlined className="text-gray text-xs" />}
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
                  </Card>
                </div>
              )
            )
          ) : (
            <Empty />
          )}
        </Spin>
        {data && data.hasMore ? (
          <div className="flex justify-end">
            <Button
              size="small"
              type="text"
              icon={<DownOutlined />}
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
              loading={loading}
            >
              Load More
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Space>
    </Drawer>
  );
};
