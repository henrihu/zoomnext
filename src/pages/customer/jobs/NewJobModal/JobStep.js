import {
  Form,
  Input,
  Divider,
  Radio,
  Space,
  InputNumber,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Steps,
} from 'antd';
import { useState, useMemo } from 'react';

export default ({ form, budget, estimateBudget }) => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ helper: 'apple', budget: 'total' }}
          requiredMark={false}
          form={form}
        >
          <Form.Item
            label="Post job for helpers to accept?"
            name="helper"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="apple">
                  Award job to first helper who accepts my budget
                </Radio>
                <Radio value="pear">Send me bids to review</Radio>
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
            <Input.TextArea
              placeholder="Details"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
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
              <TimePicker className="w-full" minuteStep={15} format="h:mm A" />
            </Form.Item>
          </Space.Compact>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: 'Please input budget!' }]}
          >
            <Radio.Group>
              <Radio value="total">Total Job</Radio>
              <Radio value="hourly">Hourly</Radio>
            </Radio.Group>
          </Form.Item>

          <Row gutter={8}>
            <Col span={budget === 'hourly' ? 12 : 24}>
              <Form.Item
                name="amount"
                rules={[{ required: true, message: 'Please input amount!' }]}
              >
                <InputNumber
                  addonBefore="$"
                  addonAfter={budget === 'hourly' && '/hr'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            {budget === 'hourly' && (
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
