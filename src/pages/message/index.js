import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Spin } from 'antd';
import UserList from './UserList';
import MessageList from './MessageList';

// Actions
import {
  getChats,
  getConversations,
  initStore,
  setMessenger,
} from 'src/store/common/actions';
import { setData as setAuthData } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const { converstations, chats, messenger } = useSelector(
    ({ common }) => common
  );
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
    if (messenger) {
      id = setInterval(() => {
        if (messenger) {
          dispatch(getChats(messenger, false));
        }
      }, 10000);
      dispatch(getChats(messenger));
      setLabel(messenger.firstName + ' ' + messenger.lastName);
    }
    return () => {
      clearInterval(id);
    };
  }, [messenger]);

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
              selected={messenger}
              setSelected={(param) => dispatch(setMessenger(param))}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <MessageList
              data={chats.data}
              loading={chats.loading}
              selected={messenger}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
