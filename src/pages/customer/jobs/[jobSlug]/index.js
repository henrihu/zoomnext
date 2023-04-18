import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import DetailCard from './DetailCard';
import BidList from './BidList';
import StatusList from './StatusList';
import MoreWork from './MoreWork';

// Actions
import { getJobDetail } from 'src/store/c_jobs/actions';
import { JOB_STATUS_ASSIGNED, JOB_STATUS_PENDING } from 'src/utils/constants';

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
      <Meta
        title="Job Detail | Zoom Errands"
        description="Zoom Errands"
        label="My Job Details"
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            type="link"
            onClick={() => router.push('/customer/jobs')}
            icon={<ArrowLeftOutlined />}
          >
            Back to List
          </Button>
        </Col>
        <Col sm={24} md={8} className="flex flex-col gap-2">
          <DetailCard data={data} loading={loading} />
          {/* {data.status === JOB_STATUS_ASSIGNED && <MoreWork />} */}
          <MoreWork />
        </Col>
        <Col sm={24} md={16}>
          {/* {data.status == JOB_STATUS_PENDING ? (
            <BidList data={data.bids} />
          ) : (
            <StatusList />
          )} */}
          <BidList data={data.bids} />
          <StatusList data={data.jobStatusHistory} />
        </Col>
      </Row>
    </>
  );
};
