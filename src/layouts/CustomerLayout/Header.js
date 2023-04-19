import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Button,
  Badge,
  Grid,
  theme,
} from 'antd';
import Link from 'next/link';
import {
  ShopOutlined,
  MessageOutlined,
  BellOutlined,
  AntDesignOutlined,
  LoginOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import MenuDrawer from './MenuDrawer';

// Actions
import { logOut, useAuth } from 'src/store/auth/actions';
import { setMenuDrawer } from 'src/store/setting/actions';
import { getNotificationList } from 'src/store/common/actions';

const { useBreakpoint } = Grid;

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const { token } = theme.useToken();
  const isXsSm = useMemo(() => screens.xs || (screens.sm && !screens.md), [
    screens,
  ]);
  const { notification_list } = useSelector(({ common }) => common);
  const { title } = useSelector(({ setting }) => setting);
  const { userDetail, notificationCount, messageCount } = useAuth();
  const ITEM_LIST = useMemo(
    () => [
      { key: '1', label: 'Home', icon: <HomeOutlined />, href: '/services' },
      {
        key: '2',
        label: 'My Jobs',
        icon: <ShopOutlined />,
        href: '/customer/jobs',
      },
      {
        key: 'messages',
        label: 'Messages',
        icon: <MessageOutlined />,
        href: '/message',
        count: messageCount,
      },
      {
        key: '4',
        label: 'Payment Method',
        icon: <ShopOutlined />,
        href: '/payment_method',
      },
      {
        key: '5',
        label: 'Payment History',
        icon: <ShopOutlined />,
        href: '/customer/payment_history',
      },
      {
        key: 'notifications',
        label: 'Notifications',
        icon: <BellOutlined />,
        href: '/notification',
      },
      {
        key: '6',
        label: 'Help',
        icon: <ProfileOutlined />,
        href: '/help',
      },
      { key: '8', label: 'Refer Friends', icon: <UsergroupAddOutlined /> },
    ],
    [messageCount]
  );
  const items = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      type: 'link',
      href: '/customer/profile',
    },
    { type: 'divider' },
    {
      key: '3',
      label: 'LOGOUT',
      icon: <LoginOutlined />,
      onClick: () => {
        dispatch(logOut(router));
      },
    },
  ];
  return (
    <Layout.Header
      className="header"
      style={{
        boxShadow: `0 1px 5px ${token.colorPrimary}`,
        backgroundColor: isXsSm ? token.colorPrimary : 'white',
      }}
    >
      {!isXsSm && (
        <>
          <Link
            href="/services"
            className="text-4xl font-bold"
            style={{ width: 250 }}
          >
            Zoom Errands
          </Link>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[
              ITEM_LIST.find(
                ({ href }) => router.pathname.indexOf(href) !== -1
              ) &&
                ITEM_LIST.find(
                  ({ href }) => router.pathname.indexOf(href) !== -1
                ).key,
            ]}
            inlineIndent={0}
            className="flex justify-between flex-auto font-bold min-w-0"
          >
            {ITEM_LIST.map(({ label, icon, href, count, key }) => (
              <Menu.Item key={key} onClick={() => router.push(href)}>
                <div className="flex items-center">
                  {icon}
                  <span className="ml-1">{label}</span>
                  <Badge count={count} overflowCount={100} className="ml-2" />
                </div>
              </Menu.Item>
            ))}
          </Menu>
        </>
      )}
      {isXsSm && (
        <>
          <Button
            shape="circle"
            icon={<MenuOutlined />}
            onClick={() => dispatch(setMenuDrawer(true))}
          />
          <h2 className="text-white text-2xl cursor-default">{title}</h2>
        </>
      )}
      <div className="flex items-center gap-2">
        {!isXsSm && (
          <Dropdown
            menu={{
              items,
              onClick: ({ item }) => {
                item.props.href && router.push(item.props.href);
              },
            }}
          >
            <div className="flex justify-center items-center cursor-pointer">
              <Avatar className="mr-2" size={40} src={userDetail.avatarImage} />
              <h2 className="font-bold" style={{ fontSize: 18 }}>
                {userDetail.firstName} {userDetail.lastName}
              </h2>
            </div>
          </Dropdown>
        )}
        <Badge count={notificationCount} overflowCount={100}>
          <Button
            shape="circle"
            loading={notification_list.loading}
            icon={<BellOutlined />}
            onClick={() => dispatch(getNotificationList())}
          />
        </Badge>
        <Badge count={messageCount} overflowCount={100}>
          <Button
            shape="circle"
            icon={<MessageOutlined />}
            onClick={() => {
              router.push('/message');
            }}
          />
        </Badge>
      </div>
      {isXsSm && <MenuDrawer items={ITEM_LIST} />}
    </Layout.Header>
  );
};
