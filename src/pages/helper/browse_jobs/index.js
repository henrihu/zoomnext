import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Spin } from 'antd';
import Filter from './Filter';
import List from './List';

// Actions
import {
  getBrowseJobList,
  getHelperCategories,
  setFilter,
} from 'src/store/h_jobs/actions';
import { useAuth } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    browse_job_list: {
      data: { total, data },
      loading,
    },
    browse_job_list_filter: filter,
    provider_categories,
  } = useSelector(({ h_jobs }) => h_jobs);
  const { type } = useAuth();

  const handleSetFilter = (d) => {
    dispatch(setFilter('browse_job_list_filter', d));
  };

  useEffect(() => {
    dispatch(getHelperCategories());
  }, []);

  useEffect(() => {
    dispatch(getBrowseJobList());
  }, [filter.orderKey, filter.orderValue]);

  return (
    <>
      <Meta
        title="Browse Jobs | Zoom Errands"
        description="Zoom Errands"
        label="Browse Jobs"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={{ span: 18, order: 1 }}
          >
            <List total={total} data={data} type={type} />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 6, order: 2 }}
          >
            <Filter
              filter={filter}
              onSetFilter={handleSetFilter}
              onFilter={() => dispatch(getBrowseJobList())}
              loading={loading}
              category_list={provider_categories.data}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
