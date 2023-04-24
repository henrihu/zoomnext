import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button, Card, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import JobDetail from '@/components/Job/JobDetail';
import BidModal from './BidModal';

// Actions
import { getJobDetail, jobBid } from 'src/store/h_jobs/actions';
import { TYPE_HELPER } from 'src/utils/constants';
import { useAuth } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobSlug = router.query.jobSlug;
  const { userDetail } = useAuth();
  const {
    job_detail: { data, loading },
  } = useSelector(({ h_jobs }) => h_jobs);
  const [modal, setModal] = useState({ open: false });

  const myBid = useMemo(
    () =>
      data &&
      data.bids &&
      data.bids.find((item) => item.providerId === userDetail.id),
    [data]
  );

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
            onClick={() => router.push('/helper/browse_jobs')}
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
        {/* <Col sm={24} md={8}>
            <Card hoverable loading={loading}>
              <Space className="w-full" direction="vertical" size={[4, 0]}>
                <div className="text-gray">My Bid</div>
                <div className="font-bold">{myBid.comment}</div>
              </Space>
            </Card>
          </Col> */}
        <Col sm={24} md={8}>
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={() => setModal({ open: true, jobId: data.id })}
          >
            Send Bid
          </Button>
        </Col>
      </Row>
      <BidModal
        {...modal}
        onOk={(data) => dispatch(jobBid(data))}
        onCancel={() => setModal({ open: false })}
      />
    </>
  );
};
