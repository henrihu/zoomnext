import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Row, Col, Spin, Empty, Button, Divider } from 'antd';

// Actions
import {
  getHelperCategories,
  providerUpdateProfile,
  setData,
  useHelperJobs,
} from 'src/store/h_jobs/actions';
import JobCategoryCard from '@/components/JobCategoryCard';

export default () => {
  const dispatch = useDispatch();
  const {
    provider_categories: { data, loading },
  } = useHelperJobs();

  const onSelectCategory = (id) => {
    dispatch(
      setData(
        'provider_categories',
        data.map((item) =>
          item.id === id
            ? { ...item, isSelectCategory: !item.isSelectCategory }
            : item
        )
      )
    );
  };

  return (
    <Spin spinning={loading}>
      <div className="category-container">
        {data && data.length > 0 ? (
          <Space
            wrap
            size="large"
            align="center"
            className="flex justify-center items-center"
          >
            {data.map((item, ind) => (
              <JobCategoryCard
                data={item}
                key={ind}
                onClick={() => onSelectCategory(item.id)}
              />
            ))}
          </Space>
        ) : (
          <Empty />
        )}
      </div>
    </Spin>
  );
};
