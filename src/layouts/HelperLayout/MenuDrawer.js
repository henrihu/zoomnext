import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Drawer, Menu, Row, Col, Button, Avatar, Space, theme } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from 'src/utils/constants';
import moment from 'moment';

import { logOut } from 'src/store/auth/actions';
import { setMenuDrawer } from 'src/store/setting/actions';

export default ({ items, setTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = theme.useToken();
  const { menu_drawer } = useSelector(({ setting }) => setting);
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
              src="/images/service.png"
              size={80}
              style={{ border: `2px solid ${token.colorPrimary}` }}
              onClick={() => {
                router.push('/helper/profile');
                dispatch(setMenuDrawer(false));
              }}
            />
            <h2>Robert Range</h2>
          </Space>
        </Col>
        <Col span={24}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={
              items.find(({ href }) => router.pathname.indexOf(href) !== -1) &&
              items.find(({ href }) => router.pathname.indexOf(href) !== -1).key
            }
            inlineIndent={0}
            items={items}
            onClick={({ item }) => {
              item.props.href && router.push(item.props.href);
              dispatch(setMenuDrawer(false));
            }}
          />
        </Col>
        <Col span={24}>
          <Button type="link">
            Switch to Customer <ArrowsAltOutlined />
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
