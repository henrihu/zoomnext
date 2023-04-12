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
  StarOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import MenuDrawer from './MenuDrawer';

// Actions
import { logOut } from 'src/store/auth/actions';
import { setMenuDrawer, setTitle } from 'src/store/setting/actions';
import { getNotificationList } from 'src/store/common/actions';

const ITEM_LIST = [
  {
    key: 'home',
    label: 'Home',
    icon: <HomeOutlined />,
    href: '/services',
  },
  {
    key: 'myjobs',
    label: 'My Jobs',
    icon: <ShopOutlined />,
    href: '/helper/jobs',
  },
  {
    key: 'browsejobs',
    label: 'Browse Jobs',
    icon: <ShopOutlined />,
    href: '/helper/browse_jobs',
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: <MessageOutlined />,
    href: '/message',
  },
  {
    key: 'reviews',
    label: 'Jobs Reviews',
    icon: <StarOutlined />,
    href: '/helper/reviews',
  },
  {
    key: 'categories',
    label: 'Job Categories',
    icon: <ShopOutlined />,
    href: '/helper/job_categories',
  },
  {
    key: 'paymentmethod',
    label: 'Payment Method',
    icon: <ShopOutlined />,
    href: '/payment_method',
  },
  {
    key: 'paymenthistory',
    label: 'Payment History',
    icon: <ShopOutlined />,
    href: '/helper/payment_history',
  },
  {
    key: 'paymentsettings',
    label: 'Payment Settings',
    icon: <ShopOutlined />,
    href: '/helper/payment_settings',
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: <BellOutlined />,
    href: '/notification',
  },
  {
    key: 'help',
    label: 'Help',
    icon: <ProfileOutlined />,
    href: '/help',
  },
  {
    key: 'referfriends',
    label: 'Refer Friends',
    icon: <UsergroupAddOutlined />,
  },
];

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
  const items = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      type: 'link',
      href: '/helper/profile',
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
            defaultSelectedKeys={
              ITEM_LIST.find(
                ({ href }) => router.pathname.indexOf(href) !== -1
              ) &&
              ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1)
                .key
            }
            className="flex justify-between flex-auto font-bold min-w-0"
            items={ITEM_LIST}
            onClick={({ item }) => {
              item.props.href && router.push(item.props.href);
            }}
          />
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
              <Avatar className="mr-4" size={40} icon={<AntDesignOutlined />} />
              <h2 className="font-bold" style={{ fontSize: 18 }}>
                WYATT LITTLE
              </h2>
            </div>
          </Dropdown>
        )}
        <Badge count={1} overflowCount={100}>
          <Button
            shape="circle"
            loading={notification_list.loading}
            icon={<BellOutlined />}
            onClick={() => dispatch(getNotificationList())}
          />
        </Badge>
        <Button
          shape="circle"
          icon={<MessageOutlined />}
          onClick={() => {
            router.push('/message');
          }}
        />
      </div>
      <MenuDrawer
        items={ITEM_LIST}
        setTitle={(value) => dispatch(setTitle(value))}
      />
    </Layout.Header>
  );
};
