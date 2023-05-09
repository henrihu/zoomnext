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
  theme,
  Modal,
} from 'antd';
import Link from 'next/link';
import {
  ShopOutlined,
  MessageOutlined,
  BellOutlined,
  LoginOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  MenuOutlined,
  StarOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons';
import MenuDrawer from '../MenuDrawer';

// Actions
import {
  becomeProviderCustomer,
  logOut,
  setPageLoading,
  setType,
  useAuth,
} from 'src/store/auth/actions';
import {
  setMenuDrawer,
  setNotificationDrawer,
} from 'src/store/setting/actions';
import {
  CUSTOMER,
  HELPER,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';
import { useScreen } from 'src/utils/common';
import Logo from '@/components/Logo';

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const isXsSm = useScreen();
  const { notification_list } = useSelector(({ common }) => common);
  const { title } = useSelector(({ setting }) => setting);
  const { userDetail, notificationCount, messageCount, type } = useAuth();

  const handleBecomeProviderCustomer = async () => {
    dispatch(setPageLoading(true));
    const isSuccess = await dispatch(
      becomeProviderCustomer(
        type === TYPE_CUSTOMER ? TYPE_HELPER : TYPE_CUSTOMER
      )
    );
    if (isSuccess) {
      await router.push('/services');
      await dispatch(
        setType(type === TYPE_CUSTOMER ? TYPE_HELPER : TYPE_CUSTOMER)
      );
    }
    dispatch(setPageLoading(false));
  };

  const ITEM_LIST = useMemo(
    () =>
      type === TYPE_CUSTOMER
        ? [
            {
              key: '1',
              label: 'Home',
              icon: <HomeOutlined />,
              href: '/services',
            },
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
              href: '/payment_history',
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
            // {
            //   key: '8',
            //   label: 'Refer Friends',
            //   icon: <UsergroupAddOutlined />,
            // },
          ]
        : [
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
              count: messageCount,
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
              key: 'paymenthistory',
              label: 'Payout History',
              icon: <ShopOutlined />,
              href: '/payment_history',
            },
            {
              key: 'paymentmethod',
              label: 'Payment Method',
              icon: <ShopOutlined />,
              href: '/payment_method',
            },
            {
              key: 'paymentsettings',
              label: 'Payout Settings',
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
            // {
            //   key: 'referfriends',
            //   label: 'Refer Friends',
            //   icon: <UsergroupAddOutlined />,
            // },
          ],
    [messageCount, type]
  );
  const items = useMemo(
    () => [
      {
        key: 'profile',
        label: 'Profile',
        icon: <ProfileOutlined />,
        type: 'link',
        href: '/profile',
      },
      {
        key: 'switch',
        label: `Switch to ${
          type === TYPE_CUSTOMER ? HELPER.label : CUSTOMER.label
        }`,
        icon: <ArrowsAltOutlined />,
        type: 'link',
        onClick: () => {
          Modal.confirm({
            content: 'Are you sure you want to continue?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: async () => {
              dispatch(setPageLoading(true));
              await router.push('/services');
              await dispatch(
                setType(type === TYPE_CUSTOMER ? TYPE_HELPER : TYPE_CUSTOMER)
              );
              dispatch(setPageLoading(false));
            },
          });
        },
        hide: !userDetail.isProvider || !userDetail.isCustomer,
      },
      {
        key: 'become',
        label: `Become a ${
          type === TYPE_CUSTOMER ? HELPER.label : CUSTOMER.label
        }`,
        icon: <ArrowsAltOutlined />,
        type: 'link',
        onClick: () => {
          Modal.confirm({
            content: 'Are you sure you want to continue?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: handleBecomeProviderCustomer,
          });
        },
        hide: userDetail.isProvider && userDetail.isCustomer,
      },
      { type: 'divider' },
      {
        key: '3',
        label: 'LOGOUT',
        icon: <LoginOutlined />,
        onClick: () => {
          Modal.confirm({
            content: 'Are you sure you want to log out?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => dispatch(logOut(router)),
          });
        },
      },
    ],
    [type]
  );

  const selectedKeys = useMemo(
    () => [
      ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1) &&
        ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1).key,
    ],
    [router.pathname]
  );

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
          <div className="px-4">
            <Logo
              type={type}
              className="cursor-pointer"
              onClick={() => router.push('/services')}
            />
          </div>

          <Menu
            mode="horizontal"
            selectedKeys={selectedKeys}
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
              items: items.filter(({ hide }) => !hide),
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
        <Badge count={messageCount} overflowCount={100}>
          <Button
            shape="circle"
            icon={<MessageOutlined />}
            onClick={() => {
              router.push('/message');
            }}
          />
        </Badge>
        <Badge count={notificationCount} overflowCount={100}>
          <Button
            shape="circle"
            loading={notification_list.loading}
            icon={<BellOutlined />}
            onClick={() => dispatch(setNotificationDrawer(true))}
          />
        </Badge>
      </div>
      {isXsSm && <MenuDrawer items={ITEM_LIST} selectedKeys={selectedKeys} />}
    </Layout.Header>
  );
};
