import { Space, Row, Col, Typography } from 'antd';

// Utils & Constants
import {
  BUDGET_OPTION_LIST,
  POST_OPTION_LIST,
  FEE_RATE,
  CLEANING_OPTION_LIST,
  CATEGORY_TYPE_CLEANING,
  CATEGORY_TYPE_DELIVERY,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

import AddressDetail from './AddressDetail';

const DescItem = ({ children, label }) => {
  return (
    <Space direction="vertical" size={[4, 0]}>
      <div className="text-gray">{label}</div>
      <div className="font-bold">{children}</div>
    </Space>
  );
};

export default ({ data, type }) => {
  return (
    <Row justify="center" gutter={[8, 8]}>
      <Col span={24}>
        <DescItem label="Job Title">{data.title}</DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Job Description">
          <Typography.Text>{data.description}</Typography.Text>
        </DescItem>
      </Col>
      {type !== CATEGORY_TYPE_DELIVERY && (
        <Col span={24}>
          <AddressDetail
            data={{
              location: data.address,
              date: data.date,
              time: data.time,
            }}
          />
        </Col>
      )}
      {type === CATEGORY_TYPE_DELIVERY && (
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <DescItem label="Pick Up Details">
              <AddressDetail
                data={{
                  location: data.pickUpaddress,
                  date: data.pickUpDate,
                  time: data.pickUpTime,
                }}
              />
            </DescItem>
          </Col>
          <Col span={12}>
            <DescItem label="Drop Off Details">
              <AddressDetail
                data={{
                  location: data.dropOffAddress,
                  date: data.dropOffDate,
                  time: data.dropOffTime,
                }}
              />
            </DescItem>
          </Col>
        </Row>
      )}
      <Col span={24}>
        <DescItem label="Budget">
          {BUDGET_OPTION_LIST[data.budget].label} - ${formatNumber(data.price)}
        </DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Service Charge (5%)">
          ${formatNumber((data.price * FEE_RATE) / 100)}
        </DescItem>
      </Col>
      {type === CATEGORY_TYPE_CLEANING && (
        <>
          <Col span={24}>
            <DescItem label="Cleaning Details">
              {data.beds.checked && `${data.beds.count} Bedroom `}
              {data.baths.checked && `${data.baths.count} Bathroom`}
            </DescItem>
          </Col>
          <Col span={24}>
            <DescItem label="Supply Details">
              {CLEANING_OPTION_LIST[data.supply].label}
            </DescItem>
          </Col>
        </>
      )}
      <Col span={24}>
        <DescItem label="Job Posting Options">
          {POST_OPTION_LIST[data.post].label}
        </DescItem>
      </Col>
    </Row>
  );
};
