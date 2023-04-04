import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin } from 'antd';
import List from './List';

// Actions
import { getPaymentHistory, setFilter } from 'src/store/payment/actions';

export default () => {
  const dispatch = useDispatch();
  const {
    payment_history: {
      data: { total, data },
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
      <Meta title="Payment History | Zoom Errands" description="Zoom Errands" />
      <Spin spinning={loading}>
        <Row justify="center" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6}>
            <Card
              title="Total Spent"
              bodyStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              size="small"
            >
              <span class="text-3xl font-bold">$1065.50</span>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={18}>
            <List
              total={total}
              data={data}
              page={filter.page}
              onSetFilter={handleSetFilter}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};
