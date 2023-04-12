import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin, Space, Button } from 'antd';
import UserList from './UserList';
import ChatBoard from './ChatBoard';

// Actions
import { getMessageList } from 'src/store/common/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    message_list: { data, loading },
  } = useSelector(({ common }) => common);

  useEffect(() => {
    dispatch(getMessageList());
  }, []);

  return (
    <>
      <Meta
        title="Messages | Zoom Errands"
        description="Zoom Errands"
        label="Messages"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={8}>
            <UserList />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <ChatBoard data={data} loading={loading} />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
