import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Input, Collapse, Row, Col, Spin, Space, Divider, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// Actions
import { getHelpList } from 'src/store/common/actions';
import ContactUsModal from './ContactUsModal';

export default () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(({ common }) => common.help_list);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false });

  const filtered_data = useMemo(() => data.filter((item) => true), [data]);

  useEffect(() => {
    dispatch(getHelpList());
  }, []);

  return (
    <>
      <Meta title="Help | Zoom Errands" description="Zoom Errands" />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={9}>
            <Input
              placeholder="Search Questions"
              prefix={<SearchOutlined />}
              size="large"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <Collapse
              defaultActiveKey={[
                filtered_data &&
                  filtered_data.length > 0 &&
                  filtered_data[0].id,
              ]}
            >
              {filtered_data &&
                filtered_data.length > 0 &&
                filtered_data.map(({ question, answer, id }) => (
                  <Collapse.Panel header={question} key={id}>
                    <p>{answer}</p>
                  </Collapse.Panel>
                ))}
            </Collapse>
          </Col>
          <Col xs={24} sm={24} md={16}>
            <Divider>
              <Space direction="vertical" size={4}>
                <spin className="text-gray">Don't see your answer here?</spin>
                <Button type="primary" onClick={() => setModal({ open: true })}>
                  Contact Support
                </Button>
              </Space>
            </Divider>
          </Col>
        </Row>
        <ContactUsModal
          {...modal}
          onOk={() => setModal({ open: false })}
          onCancel={() => setModal({ open: false })}
        />
      </Spin>
    </>
  );
};
