import Meta from '@/components/Meta';
import { Card, Button, Space, Modal, Row, Col, Spin } from 'antd';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import SettingModal from './SettingModal';
import { useEffect, useState } from 'react';
import { MODAL_TYPE_ADD, MODAL_TYPE_UPDATE } from 'src/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addBank, getBank, stripeConnect } from 'src/store/bank/actions';

// const data = {
//   accountHolderName: 'Kishor Purohit',
//   routingNumber: '110000000',
//   accountNumber: '000123456789',
// };

export default () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ open: false });
  const {
    bank: { data, loading: bank_loading },
    stripe_connect: { loading: stripe_connect_loading },
  } = useSelector(({ bank }) => bank);

  useEffect(() => {
    dispatch(getBank());
  }, []);

  return (
    <>
      <Meta
        title="Payout Settings | Zoom Errands"
        description="Zoom Errands"
        label="Payout Settings"
      />
      {/* <iframe
        name="I1"
        id="if1"
        width="100%"
        height="100vh"
        style={{ height: '100vh' }}
        src="http://10.97.5.121/elog/url/list?flag=dev&url=connect.stripe"
      ></iframe> */}
      {/* <Spin spinning={bank_loading}>
        <div className="flex justify-center">
          {data ? (
            <Card
              hoverable
              style={{
                width: 300,
              }}
              size="small"
              actions={[
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => setModal({ open: true, data: data })}
                  size="small"
                >
                  Update
                </Button>,
                <Button
                  type="text"
                  icon={<LinkOutlined />}
                  onClick={() => {
                    dispatch(stripeConnect());
                  }}
                  size="small"
                  loading={stripe_connect_loading}
                >
                  Connect
                </Button>,
              ]}
            >
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <h2>{data.accountHolderName}</h2>
                </Col>
                <Col span={24}>
                  <Space direction="vertical" size={0}>
                    <span className="font-bold text-gray">Account Number</span>
                    {data.accountNumber}
                  </Space>
                </Col>
                <Col span={24}>
                  <Space direction="vertical" size={0}>
                    <span className="font-bold text-gray">Rounting Number</span>
                    {data.routingNumber}
                  </Space>
                </Col>
              </Row>
            </Card>
          ) : (
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => setModal({ open: true })}
            >
              Add Your Account
            </Button>
          )}
        </div>
        {modal.open && (
          <SettingModal
            {...modal}
            onOk={(param) => dispatch(addBank(param))}
            onCancel={() => setModal({ open: false })}
          />
        )}
      </Spin> */}
    </>
  );
};
