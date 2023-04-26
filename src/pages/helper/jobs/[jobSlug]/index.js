import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import JobDetail from '@/components/Job/JobDetail';

// Actions
import { getJobDetail } from 'src/store/h_jobs/actions';
import {
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_CANCEL,
  JOB_STATUS_COMPLETE,
  JOB_STATUS_ONGOING,
  TYPE_HELPER,
} from 'src/utils/constants';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobSlug = router.query.jobSlug;
  const {
    job_detail: { data, loading },
  } = useSelector(({ h_jobs }) => h_jobs);
  const [modal, setModal] = useState({ open: false });

  const statusList = {
    [JOB_STATUS_ASSIGNED]: {
      label: 'Start',
      action: () => {
        console.log('start');
      },
    },
    [JOB_STATUS_ONGOING]: {
      label: 'Location On Map',
      action: () => {
        console.log('Location On Map');
      },
    },
  };

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
        <Col sm={24} md={16}>
          <Card hoverable loading={loading}>
            <JobDetail data={data} type={TYPE_HELPER} />
          </Card>
        </Col>
        {data.status !== JOB_STATUS_COMPLETE &&
          data.status !== JOB_STATUS_CANCEL && (
            <Col sm={24} md={8}>
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={
                  statusList[data.status] && statusList[data.status].action
                }
              >
                {statusList[data.status] && statusList[data.status].label}
              </Button>
            </Col>
          )}
      </Row>
    </>
  );
};
