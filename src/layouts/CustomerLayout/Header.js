import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Layout, Menu, Dropdown, Avatar, Button, Badge } from 'antd';
import Link from 'next/link';
import {
  ShopOutlined,
  MessageOutlined,
  BellOutlined,
  AntDesignOutlined,
  LoginOutlined,
  ProfileOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
} from '@ant-design/icons';

// Actions
import { logOut } from 'src/store/auth/actions';
import { getNotificationList } from 'src/store/common/actions';

const ITEM_LIST = [
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
    key: '6',
    label: 'Help',
    icon: <ProfileOutlined />,
    href: '/help',
  },
  { key: '7', label: "FAQ's", icon: <SettingOutlined /> },
  { key: '8', label: 'Refer Friends', icon: <UsergroupAddOutlined /> },
];

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notification_list } = useSelector(({ common }) => common);
  const items = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      type: 'link',
      href: '/customer/profile',
    },
    {
      key: '1',
      label: 'Notifications',
      icon: <BellOutlined />,
      href: '/notification',
    },
    {
      key: '2',
      label: 'Messages',
      icon: <MessageOutlined />,
      href: '/message',
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
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        height: 100,
        gap: 16,
        boxShadow: '0 1px 5px black',
        paddingLeft: 32,
        paddingRight: 16,
      }}
      className="flex justify-between items-center"
    >
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
          ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1) &&
          ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1).key
        }
        className="flex justify-between flex-auto font-bold min-w-0"
        items={ITEM_LIST}
        onClick={({ item }) => {
          item.props.href && router.push(item.props.href);
        }}
      />
      <div className="flex items-center gap-2">
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
            router.push('/customer/message');
          }}
        />
      </div>
    </Layout.Header>
  );
};
