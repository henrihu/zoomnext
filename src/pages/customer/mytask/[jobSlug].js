import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import { CustomerLayout } from 'src/layouts';
import { Divider, Row, Col, Spin, Button } from 'antd';

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
    <CustomerLayout title="Zoom Errands | My Task" description="Zoom Errands">
      <Button type="primary" onClick={() => router.push('/customer/mytask')}>
        Back
      </Button>
      <div>{data && data.title}</div>
      <div>123123</div>
    </CustomerLayout>
  );
};
