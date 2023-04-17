import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin, Space, Button } from 'antd';
import List from './List';

// Actions
import { getPaymentHistory, setFilter } from 'src/store/payment/actions';
import { formatNumber } from 'src/utils/common';

export default () => {
  const dispatch = useDispatch();
  const {
    payment_history: {
      data: { paymentHistory, hasMore, totalPrice },
      loading,
    },
    payment_history_filter: filter,
  } = useSelector(({ payment }) => payment);

  const handleSetFilter = (d) => {
    dispatch(setFilter('payment_history_filter', d));
  };

  useEffect(() => {
    dispatch(getPaymentHistory());
  }, [filter]);

  return (
    <>
      <Meta
        title="Payment History | Zoom Errands"
        description="Zoom Errands"
        label="Payment History"
      />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  title="Total Spent"
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  hoverable
                  size="small"
                >
                  <span class="text-3xl font-bold">
                    ${formatNumber(totalPrice)}
                  </span>
                  <span className="text-gray">
                    Do you need to post another job?
                  </span>
                  <Button type="primary" size="large" shape="round">
                    Post Job
                  </Button>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={18}>
            <List
              total={paymentHistory.length}
              data={paymentHistory}
              loading={loading}
              page={filter.page}
              onSetFilter={handleSetFilter}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
