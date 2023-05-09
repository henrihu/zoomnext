import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Drawer,
  Menu,
  Row,
  Col,
  Button,
  Avatar,
  Space,
  theme,
  Badge,
} from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { logOut, setType, useAuth } from 'src/store/auth/actions';
import { setMenuDrawer } from 'src/store/setting/actions';
import {
  CUSTOMER,
  HELPER,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';

export default ({ items, selectedKeys }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = theme.useToken();
  const { menu_drawer } = useSelector(({ setting }) => setting);
  const { type, userDetail } = useAuth();
  return (
    <Drawer
      open={menu_drawer}
      onClose={() => dispatch(setMenuDrawer(false))}
      placement="left"
      width={270}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space direction="vertical" className="flex flex-col items-center">
            <Avatar
              src={userDetail.avatarImage}
              size={80}
              className="cursor-pointer"
              style={{ border: `2px solid ${token.colorPrimary}` }}
              onClick={() => {
                router.push('/profile');
                dispatch(setMenuDrawer(false));
              }}
            />
            <h2>Robert Range</h2>
          </Space>
        </Col>
        <Col span={24}>
          {items && items.length > 0 && (
            <Menu mode="vertical" selectedKeys={selectedKeys}>
              {items.map(({ label, icon, href, count }, index) => (
                <Menu.Item
                  key={index}
                  icon={icon}
                  onClick={() => {
                    router.push(href);
                    dispatch(setMenuDrawer(false));
                  }}
                >
                  {label}
                  <Badge
                    count={count}
                    overflowCount={100}
                    className="ml-2 mb-1"
                  />
                </Menu.Item>
              ))}
            </Menu>
          )}
        </Col>
        <Col span={24}>
          <Button
            type="link"
            onClick={() => {
              router.push('/services');
              dispatch(
                setType(type === TYPE_CUSTOMER ? TYPE_HELPER : TYPE_CUSTOMER)
              );
            }}
          >
            {`Switch to ${
              type === TYPE_CUSTOMER ? HELPER.label : CUSTOMER.label
            }`}
            <ArrowsAltOutlined />
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="text"
            danger
            onClick={() => {
              dispatch(logOut(router));
              dispatch(setMenuDrawer(false));
            }}
          >
            Log Out
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};
