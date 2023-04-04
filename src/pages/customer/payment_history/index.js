import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Row, Col, Spin, Button } from 'antd';
import PaymentCard from './Card';
import NewCardModal from './NewCardModal';

// Actions
import { getPaymentHistory } from 'src/store/payment/actions';

export default () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    ({ payment }) => payment.payment_history
  );
  const [modal, setModal] = useState({ open: false });

  useEffect(() => {
    dispatch(getPaymentHistory());
  }, []);

  return (
    <>
      <Meta title="Payment History | Zoom Errands" description="Zoom Errands" />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            <Space
              wrap
              size="large"
              align="center"
              className="flex justify-center items-center"
            >
              {data &&
                data.length > 0 &&
                data.map((item, ind) => <PaymentCard data={item} key={ind} />)}
            </Space>
          </Col>
          <Col span={24} className="flex justify-center">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => setModal({ open: true })}
            >
              Add Your Payment Method
            </Button>
          </Col>
        </Row>
      </Spin>
      <NewCardModal
        {...modal}
        onOk={() => setModal({ open: false })}
        onCancel={() => setModal({ open: false })}
      />
    </>
  );
};
