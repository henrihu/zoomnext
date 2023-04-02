import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
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
const { Header } = Layout;

const ITEM_LIST = [
  {
    key: '1',
    label: 'Home',
    icon: <HomeOutlined />,
    href: '/customer/services',
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
    href: '/customer/payment_method',
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
    href: '/customer/help',
  },
  { key: '7', label: "FAQ's", icon: <SettingOutlined /> },
  { key: '8', label: 'Refer Friends', icon: <UsergroupAddOutlined /> },
];

const items = [
  { key: '1', label: 'Notifications', icon: <BellOutlined /> },
  { key: '2', label: 'Messages', icon: <MessageOutlined /> },
  { type: 'divider' },
  { key: '3', label: 'LOGOUT', icon: <LoginOutlined /> },
];

export default () => {
  const router = useRouter();
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        height: 120,
      }}
      className="flex items-center justify-between"
    >
      <Link
        href="/customer/services"
        className="text-4xl font-bold"
        style={{
          minWidth: 250,
          background: 'white',
          marginLeft: 24,
        }}
      >
        Zoom Errands
      </Link>

      <div className="flex items-center justify-end w-full">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={
            ITEM_LIST.find(({ href }) => router.pathname.indexOf(href) !== -1)
              .key
          }
          style={{ minWidth: 0, flex: 'auto' }}
          className="flex justify-between"
          items={ITEM_LIST}
          onClick={({ item }) => {
            item.props.href && router.push(item.props.href);
          }}
        />
      </div>

      <div
        style={{
          minWidth: 200,
          background: 'white',
        }}
        className="flex justify-center items-center"
      >
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
      </div>
    </Header>
  );
};
