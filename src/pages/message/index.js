import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin, Space, Button } from 'antd';
import UserList from './UserList';
import ChatBoard from './ChatBoard';

// Actions
import { getChats, getConversations } from 'src/store/common/actions';
import { setData as setAuthData } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const { converstations, chats } = useSelector(({ common }) => common);
  const [selected, setSelected] = useState();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(setAuthData({ messageCount: 0 }));
  }, []);

  useEffect(() => {
    if (selected && selected.id) {
      dispatch(getChats(selected));
    }
  }, [selected]);

  return (
    <>
      <Meta
        title="Messages | Zoom Errands"
        description="Zoom Errands"
        label="Messages"
      />
      <Spin spinning={false}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={8}>
            <UserList
              data={converstations.data}
              loading={converstations.loading}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <ChatBoard
              data={chats.data}
              loading={chats.loading}
              selected={selected}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
