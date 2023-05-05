import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Row, Col, Button, Card, Modal, InputNumber, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import JobDetail from '@/components/Job/JobDetail';

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

  const myBid = useMemo(
    () =>
      data &&
      data.bids &&
      data.bids.find((item) => item.providerId === userDetail.id),
    [data]
  );

  const [confirm, setConfirm] = useState(false);
  const [amount, setAmount] = useState();
  const [comment, setComment] = useState();

  const handleSend = useCallback(async () => {
    const param = { jobId: data.id, price: amount, comment };
    const isSuccess = await dispatch(jobBid(param, jobSlug));
    if (isSuccess) {
      setConfirm(true);
    }
  }, [data, amount, comment, jobSlug]);

  useEffect(() => {
    setAmount(myBid && Number(myBid.price));
    setComment(myBid && myBid.comment);
  }, [myBid]);

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
        <Col sm={24} md={8}>
          <Card
            title="Send Bid"
            hoverable
            actions={[
              <Button type="primary" onClick={!myBid ? handleSend : () => {}}>
                {!myBid ? 'Send Bid' : 'Already Sent Bid'}
              </Button>,
            ]}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <InputNumber
                  prefix="$"
                  className="w-full"
                  size="large"
                  placeholder="Enter Bid Amount"
                  readOnly={myBid}
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  min={0}
                />
              </Col>
              <Col span={24}>
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder="Comment"
                  size="large"
                  readOnly={myBid}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Col>
            </Row>
          </Card>
          {/* <Button
            type="primary"
            size="large"
            shape="round"
            onClick={
              myBid === undefined || myBid.length === 0
                ? () => setModal({ open: true, jobId: data.id })
                : () => {}
            }
          >
            {myBid === undefined || myBid.length === 0
              ? 'Send Bid'
              : 'Already Sent Bid'}
          </Button> */}
        </Col>
      </Row>
      <Modal
        open={confirm}
        closable={false}
        footer={null}
        width={300}
        centered={true}
      >
        <div className="flex flex-col items-center gap-2">
          <h2>${amount}</h2>
          <span>Your bid has been sent</span>
          <Button
            type="primary"
            shape="round"
            onClick={() => setConfirm(false)}
          >
            Okay
          </Button>
        </div>
      </Modal>
    </>
  );
};
