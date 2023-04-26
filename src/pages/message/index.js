import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin, Space, Button } from 'antd';
import UserList from './UserList';
import MessageList from './MessageList';

// Actions
import {
  getChats,
  getConversations,
  initStore,
} from 'src/store/common/actions';
import { setData as setAuthData } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const { converstations, chats } = useSelector(({ common }) => common);
  const [selected, setSelected] = useState();
  const [label, setLabel] = useState('Messages');

  useEffect(() => {
    dispatch(getConversations());
    dispatch(setAuthData({ messageCount: 0 }));

    return () => {
      dispatch(initStore('conversations'));
      dispatch(initStore('chats'));
    };
  }, []);

  useEffect(() => {
    let id;
    if (selected && selected.id) {
      id = setInterval(() => {
        if (selected && selected.id) {
          dispatch(getChats(selected, false));
        }
      }, 5000);
      dispatch(getChats(selected));
      setLabel(selected.firstName);
    }
    return () => {
      clearInterval(id);
    };
  }, [selected]);

  return (
    <>
      <Meta
        title="Messages | Zoom Errands"
        description="Zoom Errands"
        label={label}
      />
      <Spin spinning={false}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={8}>
            <UserList
              data={converstations.data}
              chatLoading={chats.loading}
              loading={converstations.loading}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <MessageList
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
