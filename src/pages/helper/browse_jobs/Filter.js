import { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Divider,
  Card,
  Checkbox,
  Slider,
  DatePicker,
  Space,
  Collapse,
} from 'antd';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

const Wrapper = ({ label, children }) => {
  return (
    <Card title={label} size="small">
      {children}
    </Card>
  );
};

export default ({
  filter,
  onSetFilter,
  onFilter,
  loading,
  category_list = [],
}) => {
  const [date, setDate] = useState('asc');
  const [totalPrice, setTotalPrice] = useState('asc');
  const [distance, setDistance] = useState('asc');
  return (
    <Row gutter={[8, 8]}>
      <Col xs={8} sm={8} md={24}>
        <Button
          icon={
            date === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'jobDateAndTime' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = date === 'asc' ? 'desc' : 'asc';
            setDate(orderValue);
            onSetFilter({ orderKey: 'jobDateAndTime', orderValue });
          }}
        >
          Date
        </Button>
      </Col>
      <Col xs={8} sm={8} md={24}>
        <Button
          icon={
            totalPrice === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'totalPrice' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = totalPrice === 'asc' ? 'desc' : 'asc';
            setTotalPrice(orderValue);
            onSetFilter({ orderKey: 'totalPrice', orderValue });
          }}
        >
          Price
        </Button>
      </Col>
      <Col xs={8} sm={8} md={24}>
        <Button
          icon={
            distance === 'asc' ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          }
          className="w-full"
          type={filter.orderKey == 'distance' ? 'primary' : 'default'}
          onClick={() => {
            const orderValue = distance === 'asc' ? 'desc' : 'asc';
            setDistance(orderValue);
            onSetFilter({ orderKey: 'distance', orderValue });
          }}
        >
          Location
        </Button>
      </Col>
      <Col span={24}>
        <Divider className="my-2" />
      </Col>
      <Col span={24}>
        <Collapse>
          <Collapse.Panel header="Search Jobs">
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Wrapper label="Select Category">
                  <Space wrap>
                    {category_list &&
                      category_list.map(({ id, name }) => (
                        <Button
                          type={
                            filter.categoryId.find((_id) => id === _id)
                              ? 'primary'
                              : 'default'
                          }
                          size="small"
                          shape="round"
                          onClick={() => {
                            const { categoryId } = filter;
                            onSetFilter({
                              categoryId: categoryId.find((_id) => id === _id)
                                ? categoryId.reduce(
                                    (res, cur) =>
                                      cur === id ? res : [...res, cur],
                                    []
                                  )
                                : [...categoryId, id],
                            });
                          }}
                        >
                          {name}
                        </Button>
                      ))}
                  </Space>
                </Wrapper>
              </Col>
              <Col span={24}>
                <Wrapper label="Select Date">
                  <div className="flex flex-col gap-1">
                    <Checkbox
                      checked={filter.isNewestFirst}
                      onChange={(e) =>
                        onSetFilter({ isNewestFirst: e.target.checked })
                      }
                    >
                      Newest Pay
                    </Checkbox>
                    <DatePicker.RangePicker
                      format="YYYY-MM-DD"
                      onChange={([startDate, endDate]) =>
                        onSetFilter({ startDate, endDate })
                      }
                    />
                  </div>
                </Wrapper>
              </Col>
              <Col span={24}>
                <Wrapper label="Select Distance">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray">Min 0(Miles)</span>
                      <span className="text-gray">Max 100(Miles)</span>
                    </div>
                    <Slider
                      range
                      min={0}
                      max={100}
                      step="0.01"
                      value={[filter.latitude, filter.longitude]}
                      onChange={([latitude, longitude]) =>
                        onSetFilter({ latitude, longitude })
                      }
                      tooltip={{ formatter: (value) => `${value}Miles` }}
                    />
                  </div>
                </Wrapper>
              </Col>
              <Col span={24}>
                <Wrapper>
                  <Checkbox
                    checked={filter.isHighestPay}
                    onChange={(e) =>
                      onSetFilter({ isHighestPay: e.target.checked ? 1 : 0 })
                    }
                  >
                    Highest Pay
                  </Checkbox>
                </Wrapper>
              </Col>
              <Col span={24} className="flex justify-center">
                <Button
                  type="primary"
                  shape="round"
                  onClick={onFilter}
                  loading={loading}
                >
                  Filter Jobs
                </Button>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
};
