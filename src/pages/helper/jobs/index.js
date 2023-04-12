import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Spin } from 'antd';
import Filter from './Filter';
import List from './List';

// Actions
import { getJobList, setFilter } from 'src/store/h_jobs/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    job_list: {
      data: { total, data },
      loading,
    },
    job_list_filter: filter,
  } = useSelector(({ h_jobs }) => h_jobs);

  const handleSetFilter = (d) => {
    dispatch(setFilter('job_list_filter', d));
  };

  useEffect(() => {
    dispatch(getJobList());
  }, [filter]);

  return (
    <>
      <Meta
        title="My Jobs | Zoom Errands"
        description="Zoom Errands"
        label="My Jobs"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 18, order: 1 }}
          >
            <List
              total={total}
              data={data}
              page={filter.page}
              onSetFilter={handleSetFilter}
            />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 6, order: 2 }}
          >
            <Filter filter={filter} onSetFilter={handleSetFilter} />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
