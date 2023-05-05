import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button, Spin, Card } from 'antd';
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
import { JOB_STATUS_PENDING } from 'src/utils/constants';
import { useAuth } from 'src/store/auth/actions';
import JobDetail from '@/components/Job/JobDetail';

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
      <Spin spinning={loading}>
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
          <Col sm={24} md={data.status !== JOB_STATUS_PENDING ? 8 : 10}>
            {/* <DetailCard data={data} /> */}
            <Card hoverable>
              <JobDetail data={data} type={type} />
            </Card>
          </Col>
          {data.status !== JOB_STATUS_PENDING ? (
            <>
              <Col sm={24} md={8}>
                <StatusList
                  data={data}
                  completeJob={(data) =>
                    dispatch(customerCompleteJob(data, jobSlug))
                  }
                />
              </Col>
              <Col sm={24} md={8}>
                <MoreWork
                  jobId={data.id}
                  data={data.jobMilestones}
                  type={type}
                  status={data.status}
                  onCreate={(params) =>
                    dispatch(createJobMilestones(params, jobSlug))
                  }
                />
              </Col>
            </>
          ) : (
            <Col sm={24} md={14}>
              <BidList
                data={data.bids}
                router={router}
                approveBid={(data) => dispatch(approveBid(data, jobSlug))}
              />
            </Col>
          )}
        </Row>
      </Spin>
    </>
  );
};
