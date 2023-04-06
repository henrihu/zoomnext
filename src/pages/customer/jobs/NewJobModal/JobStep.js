import {
  Form,
  Input,
  Radio,
  Space,
  InputNumber,
  Row,
  Col,
  DatePicker,
  TimePicker,
} from 'antd';
import CleaningItem from './CleaningItem';
import SelectLocation from './SelectLocation';
import {
  BUDGET_OPTION_HOURLY,
  BUDGET_OPTION_LIST,
  BUDGET_OPTION_TOTAL_JOB,
  POST_OPTION_FIRST_HELPER,
  POST_OPTION_LIST,
  CLEANING_OPTION_LIST,
  TIME_FORMAT,
  CLEANING_OPTION_HAVE,
} from 'src/utils/constants';

export default ({ form, budget, estimateBudget }) => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            post: POST_OPTION_FIRST_HELPER,
            budget: BUDGET_OPTION_TOTAL_JOB,
            supply: CLEANING_OPTION_HAVE,
            beds: { checked: true, count: 1 },
            baths: { checked: true, count: 1 },
          }}
          requiredMark={false}
          form={form}
        >
          <Form.Item
            label="Post job for helpers to accept?"
            name="post"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {Object.keys(POST_OPTION_LIST).map((key) => (
                  <Radio value={key} key={key}>
                    {POST_OPTION_LIST[key].label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="title"
            rules={[
              { required: true, message: 'Please input your job title!' },
            ]}
          >
            <Input placeholder="Write" />
          </Form.Item>
          <Form.Item
            label="Job Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your job description!',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Details"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item label="Cleaning Detail">
            <Form.Item name="beds">
              <CleaningItem name="Beds" />
            </Form.Item>
            <Form.Item name="baths">
              <CleaningItem name="Baths" />
            </Form.Item>
            <Form.Item
              name="supply"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Radio.Group>
                <Space>
                  {Object.keys(CLEANING_OPTION_LIST).map((key) => (
                    <Radio value={key} key={key}>
                      {CLEANING_OPTION_LIST[key].label}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Select Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please input your job description!',
              },
            ]}
          >
            <SelectLocation name="Location" />
          </Form.Item>

          <Space.Compact block>
            <Form.Item
              label="Date"
              name="date"
              className="w-full"
              rules={[{ required: true, message: 'Please select date!' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              className="w-full"
              rules={[{ required: true, message: 'Please select time!' }]}
            >
              <TimePicker
                className="w-full"
                minuteStep={15}
                format={TIME_FORMAT}
              />
            </Form.Item>
          </Space.Compact>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: 'Please input budget!' }]}
          >
            <Radio.Group>
              {Object.keys(BUDGET_OPTION_LIST).map((key) => (
                <Radio value={key} key={key}>
                  {BUDGET_OPTION_LIST[key].label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Row gutter={8}>
            <Col span={budget === BUDGET_OPTION_HOURLY ? 12 : 24}>
              <Form.Item
                name="amount"
                rules={[{ required: true, message: 'Please input amount!' }]}
              >
                <InputNumber
                  addonBefore="$"
                  addonAfter={budget === BUDGET_OPTION_HOURLY && '/hr'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            {budget === BUDGET_OPTION_HOURLY && (
              <Col span={12}>
                <Form.Item name="hour">
                  <InputNumber addonAfter="hours" className="w-full" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
