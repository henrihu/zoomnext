import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import JobDetail from '@/components/Job/JobDetail';

// Actions
import { getJobDetail, startJobPickUp } from 'src/store/h_jobs/actions';
import {
  CATEGORY_TYPE_DELIVERY,
  JOB_STATUS_ASSIGNED,
  JOB_STATUS_CANCEL,
  JOB_STATUS_COMPLETE,
  JOB_STATUS_ONGOING,
  TYPE_HELPER,
} from 'src/utils/constants';
import MoreWork from '@/components/Job/MoreWork';
import { useAuth } from 'src/store/auth/actions';
import LocationModal from '@/components/Job/LocationModal';
import { setMessenger } from 'src/store/common/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobSlug = router.query.jobSlug;
  const {
    job_detail: { data, loading },
  } = useSelector(({ h_jobs }) => h_jobs);
  const { type } = useAuth();
  const [modal, setModal] = useState({ open: false });

  useEffect(() => {
    if (jobSlug) {
      dispatch(getJobDetail({ jobSlug }));
    }
  }, [jobSlug]);

  const renderStatusButton = useCallback(() => {
    if (data.status === JOB_STATUS_ONGOING) {
      return (
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setModal({ open: true })}
        >
          Location on Map
        </Button>
      );
    }
    if (
      data.status === JOB_STATUS_ASSIGNED &&
      data.type === CATEGORY_TYPE_DELIVERY
    ) {
      return (
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => {
            console.log('start');
            dispatch(
              startJobPickUp(
                {
                  jobId: data.id,
                  currentProviderLatitude: 0,
                  currentProviderLongitude: 0,
                  isJobStart: data.isJobStart,
                  isAllowBackground: 1,
                },
                jobSlug
              )
            );
          }}
        >
          Start
        </Button>
      );
    }
    return (
      <Button
        type="primary"
        size="large"
        shape="round"
        onClick={() => {
          dispatch(
            setMessenger({
              firstName: data.firstName,
              lastName: data.lastName,
              profileImage: data.avatarImage,
              jobId: data.id,
              userId: data.userId,
            })
          );
          router.push('/message');
        }}
      >
        Send Message
      </Button>
    );
  }, [data]);

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
            <JobDetail data={data} type={type} />
          </Card>
        </Col>
        <Col sm={24} md={8}>
          <Row gutter={[8, 8]}>
            <Col span={24} className="flex justify-center">
              {data.status !== JOB_STATUS_COMPLETE &&
                data.status !== JOB_STATUS_CANCEL &&
                renderStatusButton()}
            </Col>
            <Col span={24}>
              <MoreWork
                data={data.jobMilestones}
                type={type}
                status={data.status}
              />
            </Col>
          </Row>
          <LocationModal
            {...modal}
            data={data}
            onCancel={() => setModal({ open: false })}
          />
        </Col>
      </Row>
    </>
  );
};
