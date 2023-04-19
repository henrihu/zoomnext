import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import DetailCard from 'src/components/Job/DetailCard';
import BidList from 'src/components/Job/BidList';
import StatusList from 'src/components/Job/StatusList';

// Actions
import { getJobDetail } from 'src/store/c_jobs/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobSlug = router.query.jobSlug;
  const {
    job_detail: { data, loading },
  } = useSelector(({ c_jobs }) => c_jobs);

  useEffect(() => {
    if (jobSlug) {
      dispatch(getJobDetail({ jobSlug }));
    }
  }, [jobSlug]);

  return (
    <>
      <Meta title="Job Detail | Zoom Errands" description="Zoom Errands" />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="link"
            onClick={() => router.push('/helper/jobs')}
            icon={<ArrowLeftOutlined />}
          >
            Back to List
          </Button>
        </Col>
        <Col sm={24} md={8}>
          <DetailCard data={data} loading={loading} />
        </Col>
        <Col sm={24} md={16}>
          {data.status == 'pending' ? (
            <BidList data={data && data.bids} />
          ) : (
            <StatusList data={data && data.jobStatusHistory} />
          )}
        </Col>
      </Row>
    </>
  );
};
