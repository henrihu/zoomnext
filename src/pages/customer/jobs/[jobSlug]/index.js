import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import { CustomerLayout } from 'src/layouts';
import Meta from '@/components/Meta/index';
import { Divider, Row, Col, Spin, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import DetailCard from './DetailCard';
import BidList from './BidList';
import StatusList from './StatusList';

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
    <CustomerLayout>
      <Meta title="Job Detail | Zoom Errands" description="Zoom Errands" />
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
        <Col sm={24} md={8}>
          <DetailCard data={data} loading={loading} />
        </Col>
        <Col sm={24} md={16}>
          {data.status == 'pending' ? <BidList /> : <StatusList />}
        </Col>
      </Row>
    </CustomerLayout>
  );
};
