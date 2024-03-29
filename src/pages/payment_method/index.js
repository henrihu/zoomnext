import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Space, Row, Col, Spin, Button, Empty } from 'antd';
import PaymentCard from './Card';
import NewCardModal from './NewCardModal';

// Actions
import { addCard, getCardList } from 'src/store/payment/actions';

export default () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(({ payment }) => payment.card_list);
  const [modal, setModal] = useState({ open: false });

  useEffect(() => {
    dispatch(getCardList());
  }, []);

  return (
    <>
      <Meta
        title="Payment Method | Zoom Errands"
        description="Zoom Errands"
        label="Payment Method"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24}>
            {data && data.length > 0 ? (
              <Space
                wrap
                size="large"
                align="center"
                className="flex justify-center items-center"
              >
                {data.map((item, ind) => (
                  <PaymentCard data={item} key={ind} />
                ))}
              </Space>
            ) : (
              <Empty description="No Payment Method" />
            )}
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
        onOk={(cardInfo) => dispatch(addCard(cardInfo))}
        onCancel={() => setModal({ open: false })}
      />
    </>
  );
};
