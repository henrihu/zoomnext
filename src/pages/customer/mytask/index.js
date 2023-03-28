import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { CustomerLayout } from 'src/layouts';
import { Divider, Row, Col, Spin } from 'antd';
import Filter from './Filter';
import List from './List';

// Actions
import { getMyJobList, setFilter } from 'src/store/c_jobs/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    job_list: { data, loading },
    job_list_filter: filter,
  } = useSelector(({ c_jobs }) => c_jobs);

  const handleSetFilter = (d) => {
    dispatch(setFilter('job_list_filter', d));
  };

  useEffect(() => {
    dispatch(getMyJobList());
  }, [filter]);

  return (
    <CustomerLayout title="Zoom Errands | My Task" description="Zoom Errands">
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col span={24}>
            <Filter filter={filter} onSetFilter={handleSetFilter} />
          </Col>
          <Col span={24}>
            <List data={data} />
          </Col>
        </Row>
      </Spin>
    </CustomerLayout>
  );
};
