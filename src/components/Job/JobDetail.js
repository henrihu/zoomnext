import { Space, Row, Col, Typography, Avatar } from 'antd';
import { useMemo } from 'react';

// Utils & Constants
import {
  BUDGET_OPTION_LIST,
  CLEANING_OPTION_LIST,
  CATEGORY_TYPE_CLEANING,
  CATEGORY_TYPE_DELIVERY,
  BUDGET_OPTION_HOURLY,
  BUDGET_OPTION_TOTAL_JOB,
  CLEANING_OPTION_HAVE,
  CLEANING_OPTION_BRING,
  POST_OPTION_BID,
  POST_OPTION_FIRST_HELPER,
  POST_OPTION_LIST,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

import AddressDetail from './AddressDetail';

const DescItem = ({ children, label }) => {
  return (
    <Space className="w-full" direction="vertical" size={[10, 0]}>
      <div className="text-gray">{label}</div>
      <div className="font-bold">{children}</div>
    </Space>
  );
};

export default ({ data, type }) => {
  const budget = useMemo(
    () =>
      data && data.isHourly ? BUDGET_OPTION_HOURLY : BUDGET_OPTION_TOTAL_JOB,
    [data]
  );
  const supply = useMemo(
    () =>
      data && data.isMyOwnSupplier
        ? CLEANING_OPTION_HAVE
        : CLEANING_OPTION_BRING,
    [data]
  );
  return (
    <Row justify="center" gutter={[8, 8]}>
      <Col span={24}>
        <div className="flex justify-center items-center cursor-pointer">
          <Avatar className="mr-2" size={40} src={data.avatarImage} />
          <h2 className="font-bold" style={{ fontSize: 18 }}>
            {data.fullName}
          </h2>
        </div>
      </Col>
      <Col span={24}>
        <DescItem label="Job Title">{data.title}</DescItem>
      </Col>
      <Col span={24}>
        <DescItem label="Job Description">
          <Typography.Text className="whitespace-pre-wrap">
            {data.description}
          </Typography.Text>
        </DescItem>
      </Col>
      {data.type !== CATEGORY_TYPE_DELIVERY && (
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
      {data.type === CATEGORY_TYPE_DELIVERY && (
        <>
          <Col span={24}>
            <DescItem label="Pick Up Details">
              <AddressDetail
                data={{
                  location: data.pickUpaddress,
                  date: data.pickUpDateAndTime,
                  time: data.pickUpDateAndTime,
                }}
              />
            </DescItem>
          </Col>
          <Col span={24}>
            <DescItem label="Drop Off Details">
              <AddressDetail
                data={{
                  location: data.dropOffAddress,
                  date: data.dropOffDateAndTime,
                  time: data.dropOffDateAndTime,
                }}
              />
            </DescItem>
          </Col>
        </>
      )}
      {data.type === CATEGORY_TYPE_CLEANING && (
        <>
          <Col span={24}>
            <DescItem label="Cleaning Details">
              {`${data.numberOfBedRooms} Bedroom `}
              {`${data.numberOfBathrooms} Bathroom`}
            </DescItem>
          </Col>
          <Col span={24}>
            <DescItem label="Supply Details">
              {CLEANING_OPTION_LIST[supply].label}
            </DescItem>
          </Col>
        </>
      )}
      <Col span={24}>
        <DescItem label="Budget">
          {/* {BUDGET_OPTION_LIST[budget].label} - ${formatNumber(data.totalPrice)} */}
          {data && data.isHourly
            ? `Hourly $${formatNumber(data.price)}  ${data.noOfHours} hours`
            : `Job Total $${formatNumber(data.totalPrice)}`}
        </DescItem>
      </Col>
      {data.type === CATEGORY_TYPE_CLEANING && (
        <Col span={24}>
          <DescItem label="Job Posting Options">
            {data &&
              POST_OPTION_LIST[
                data.isAllowBids ? POST_OPTION_BID : POST_OPTION_FIRST_HELPER
              ].label}
          </DescItem>
        </Col>
      )}
    </Row>
  );
};
