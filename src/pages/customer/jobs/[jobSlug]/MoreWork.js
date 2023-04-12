import { Card, Button, Row, Col, Space, Tag, Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  BUDGET_OPTION_TOTAL_JOB,
  JOB_STATUS_ASSIGNED,
  BUDGET_OPTION_LIST,
  JOB_STATUS,
} from 'src/utils/constants';
import { formatNumber } from 'src/utils/common';

const data = [
  {
    description: 'Test Job Description',
    budget: BUDGET_OPTION_TOTAL_JOB,
    status: JOB_STATUS_ASSIGNED,
    price: 945,
  },
  {
    description: 'Test Job Description',
    budget: BUDGET_OPTION_TOTAL_JOB,
    status: JOB_STATUS_ASSIGNED,
    price: 945,
  },
  {
    description: 'Test Job Description',
    budget: BUDGET_OPTION_TOTAL_JOB,
    status: JOB_STATUS_ASSIGNED,
    price: 945,
  },
];

export default () => {
  return (
    <Collapse>
      <Collapse.Panel header="Added More Work" key="1">
        <Row gutter={[8, 8]}>
          {data &&
            data.map((item, index) => (
              <Col key={index} span={24}>
                <Card size="small" hoverable>
                  <div className="flex justify-between items-center">
                    <Space direction="vertical" size={2}>
                      <Space direction="vertical" size={0}>
                        <h3>{item.description}</h3>
                        <span className="text-gray">
                          {BUDGET_OPTION_LIST[item.budget].label} $
                          {formatNumber(item.price)}
                        </span>
                      </Space>
                      <Tag
                        size="small"
                        color={
                          JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].color
                        }
                      >
                        {JOB_STATUS[item.status] &&
                          JOB_STATUS[item.status].label}
                      </Tag>
                    </Space>
                    <h2 style={{ color: '#87CD9B' }}>${item.price}</h2>
                  </div>
                </Card>
              </Col>
            ))}
          <Col span={24} className="flex justify-center">
            <Button
              icon={<PlusOutlined />}
              shape="round"
              size="small"
              type="primary"
            >
              Add More Work
            </Button>
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};
