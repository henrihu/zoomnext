import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Button, Row, Col, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Filter from './Filter';
import List from './List';
import NewJobModal from './NewJobModal/index';

// Actions
import { getMyJobList, setFilter } from 'src/store/c_jobs/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    job_list: { data, loading },
    job_list_filter: filter,
  } = useSelector(({ c_jobs }) => c_jobs);
  const [modal, setModal] = useState({ open: false });

  const handleSetFilter = (d) => {
    dispatch(setFilter('job_list_filter', d));
  };

  useEffect(() => {
    dispatch(getMyJobList());
  }, [filter]);

  return (
    <>
      <Meta title="My Jobs | Zoom Errands" description="Zoom Errands" />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={18}>
            <List data={data} />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Filter filter={filter} onSetFilter={handleSetFilter} />
              </Col>
              <Col span={24}>
                <Button
                  danger
                  icon={<PlusOutlined />}
                  onClick={() => setModal({ open: true })}
                >
                  Click here to post more task!
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <NewJobModal
          {...modal}
          onOk={() => setModal({ open: false })}
          onCancel={() => setModal({ open: false })}
        />
      </Spin>
    </>
  );
};
