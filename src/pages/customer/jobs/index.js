import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { CustomerLayout } from 'src/layouts';
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
    <CustomerLayout title="Zoom Errands | My Jobs" description="Zoom Errands">
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col span={18}>
            <Filter filter={filter} onSetFilter={handleSetFilter} />
          </Col>
          <Col span={6}>
            <Button
              danger
              icon={<PlusOutlined />}
              onClick={() => setModal({ open: true })}
            >
              Click here to post more task!
            </Button>
          </Col>
          <Col span={24}>
            <List data={data} />
          </Col>
        </Row>
        <NewJobModal
          {...modal}
          onOk={() => setModal({ open: false })}
          onCancel={() => setModal({ open: false })}
        />
      </Spin>
    </CustomerLayout>
  );
};
