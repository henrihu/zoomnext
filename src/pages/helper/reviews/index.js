import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Spin, Avatar, Rate, Tag, Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import List from './List';

// Actions
import { getReviewList, setFilter } from 'src/store/h_jobs/actions';

const helper = {
  avatar: '/images/service.png',
  name: 'Robert Range',
  rating: 4.8,
  job_count: 9,
};

export default () => {
  const dispatch = useDispatch();

  const {
    review_list: {
      data: { hasMore, data, provider },
      loading,
    },
    review_filter: filter,
  } = useSelector(({ h_jobs }) => h_jobs);

  const handleSetFilter = (d) => {
    dispatch(setFilter('review_filter', d));
  };

  useEffect(() => {
    dispatch(getReviewList());
  }, [filter]);

  return (
    <>
      <Meta
        title="Job Reviews | Zoom Errands"
        description="Zoom Errands"
        label="Job Reviews"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6}>
            <Card hoverable>
              <Row gutter={[16, 16]}>
                <Col span={24} className="flex justify-center">
                  <Avatar src={provider && provider.avatarImage} size={100} />
                </Col>
                <Col span={24} className="flex justify-center">
                  <h2>
                    {provider && provider.firstName + ' ' + provider.lastName}
                  </h2>
                </Col>
                <Col span={24} className="flex justify-center items-center">
                  <span className="text-gray mr-4">User Ratings</span>
                  <Tag>
                    <StarFilled style={{ color: '#FADB14' }} />
                    <span className="text-bold">
                      <b>{provider && provider.avgRating}</b> (
                      {provider && provider.totalReview})
                    </span>
                  </Tag>
                </Col>
                <Col span={24} className="flex flex-col items-center">
                  <Rate value={parseInt(provider && provider.avgRate)} />
                  <span className="text-gray">Your Ratings</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={18}>
            <List
              hasMore={hasMore}
              data={data}
              loadig={loading}
              page={filter.page}
              onSetFilter={handleSetFilter}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
