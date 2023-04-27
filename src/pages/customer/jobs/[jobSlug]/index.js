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
import MoreWork from 'src/components/Job/MoreWork';

// Actions
import {
  approveBid,
  getJobDetail,
  customerCompleteJob,
  createJobMilestones,
} from 'src/store/c_jobs/actions';
import {
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_CANCEL,
  JOB_STATUS_PENDING,
} from 'src/utils/constants';
import { useAuth } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobSlug = router.query.jobSlug;
  const { type } = useAuth();
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
          {data.status !== JOB_STATUS_PENDING && (
            <MoreWork
              jobId={data.id}
              data={data.jobMilestones}
              type={type}
              status={data.status}
              onCreate={(params) => dispatch(createJobMilestones(params))}
            />
          )}
        </Col>
        <Col sm={24} md={16}>
          {data.status == JOB_STATUS_PENDING ? (
            <BidList
              data={data.bids}
              approveBid={(data) => dispatch(approveBid(data))}
            />
          ) : (
            <StatusList
              data={data}
              completeJob={(data) => dispatch(customerCompleteJob(data))}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
