import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Card, Row, Col, Spin, Space, Button } from 'antd';
import List from './List';

// Actions
import { getPaymentHistory, setFilter } from 'src/store/payment/actions';
import { formatNumber, useThemeToken } from 'src/utils/common';
import { useAuth } from 'src/store/auth/actions';
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';

const TOTAL_LIST = {
  [TYPE_CUSTOMER]: {
    title: 'Total Spent',
    desc: 'Do you need to post another job?',
    btnLabel: 'Post Job',
    href: '/services/',
  },
  [TYPE_HELPER]: {
    title: 'Total Earned',
    desc: 'Find available jobs to earn more!',
    btnLabel: 'Browse Job',
    href: '/helper/browse_jobs/',
  },
};

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useThemeToken();
  const {
    payment_history: {
      data: { paymentHistory, hasMore, totalPrice },
      loading,
    },
    payment_history_filter: filter,
  } = useSelector(({ payment }) => payment);
  const { type } = useAuth();

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
      <Row justify="center" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={6}>
          <Card
            title={TOTAL_LIST[type].title}
            headStyle={{
              color: 'white',
              backgroundColor: theme.colorPrimary,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
            loading={loading}
            hoverable
            size="small"
          >
            <span class="text-3xl font-bold my-2">
              ${formatNumber(totalPrice)}
            </span>
            <span className="text-gray">{TOTAL_LIST[type].desc}</span>
            <Button
              type="primary"
              shape="round"
              onClick={() => router.push(TOTAL_LIST[type].href)}
            >
              {TOTAL_LIST[type].btnLabel}
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <List
            data={paymentHistory}
            hasMore={hasMore}
            loading={loading}
            page={filter.page}
            onSetFilter={handleSetFilter}
          />
        </Col>
      </Row>
    </>
  );
};
