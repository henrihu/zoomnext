import { Card, Button, Row, Col, Space, Switch } from 'antd';
import Image from 'next/image';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { setDefaultCard } from 'src/store/payment/actions';

export default ({ data }) => {
  return (
    <Card
      hoverable
      style={{
        width: 300,
      }}
      size="small"
      actions={[
        <Button type="text" danger icon={<DeleteOutlined />} size="small">
          Delete
        </Button>,
        <Space>
          Set as primary
          <Switch
            checked={data.isDefault}
            size="small"
            onChange={() => dispatch(setDefaultCard(data.id))}
          />
        </Space>,
      ]}
    >
      <Row>
        <Col span={24}>
          <div className="flex justify-between items-center">
            <Space direction="vertical" size={0}>
              <span className="font-bold">Card Number</span>
              {data.cardNumber}
            </Space>
            <Image
              src="/images/service.png"
              width={30}
              height={15}
              alt="card"
            />
          </div>
        </Col>
        <Col span={24}>
          <h2>{data.cardHolderName}</h2>
        </Col>
        {/* <Col span={24}>{moment(data.expDate).format('YYYY-MM')}</Col> */}
      </Row>
    </Card>
  );
};
