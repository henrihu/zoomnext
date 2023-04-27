import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Row, Col, Spin, Empty, Button, Divider } from 'antd';

// Actions
import {
  getHelperCategories,
  setData,
  useHelperJobs,
} from 'src/store/h_jobs/actions';
import { providerUpdateProfile } from 'src/store/auth/actions';
import JobCategoryCard from '@/components/JobCategoryCard';

export default () => {
  const dispatch = useDispatch();
  const {
    provider_categories: { data, loading },
  } = useHelperJobs();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    dispatch(getHelperCategories());
  }, []);

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

  const handleSelectCategory = async () => {
    setPending(true);
    await dispatch(
      providerUpdateProfile({
        categoryId: data
          .filter(({ isSelectCategory }) => isSelectCategory)
          .map(({ id }) => id),
      })
    );
    setPending(false);
  };

  return (
    <>
      <Meta
        title="Job Categories | Zoom Errands"
        description="Zoom Errands"
        label="Job Categories"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col span={16} className="flex justify-center">
            <Divider>
              <h2>Choose Your Work</h2>
            </Divider>
          </Col>
          <Col span={24} className="flex justify-center">
            <Button shape="round" type="primary" onClick={handleSelectCategory}>
              Done
            </Button>
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Spin>
    </>
  );
};
