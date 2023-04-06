import { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Avatar,
  Modal,
  Input,
  Divider,
  InputNumber,
  Rate,
  Tag,
  Checkbox,
  Space,
} from 'antd';
import { StarFilled } from '@ant-design/icons';
import { FEE_RATE } from 'src/utils/constants';

const helper = {
  avatar: '/images/service.png',
  name: 'Robert Range',
  rating: 4.8,
  job_count: 9,
};

export default ({ open, onOk, onCancel }) => {
  const [hasTip, setHasTip] = useState(true);
  const [tipAmount, setTipAmount] = useState();
  const modal_props = {
    title: 'Rate & Review',
    open,
    okText: 'Submit',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: () => {
      onCancel();
    },
    onCancel,
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24} className="flex justify-center">
          <Row>
            <Col span={24} className="flex justify-center">
              <Avatar src={helper.avatar} size={100} />
            </Col>
            <Col span={24} className="flex justify-center">
              <h2>{helper.name}</h2>
            </Col>
            <Col span={24} className="flex justify-center items-center">
              <span className="text-gray mr-4">User Ratings</span>
              <Tag>
                <StarFilled style={{ color: '#FADB14' }} />
                <span className="text-bold">
                  <b>{helper.rating}</b> ({helper.job_count})
                </span>
              </Tag>
            </Col>
            <Col span={24} className="flex flex-col items-center">
              <Rate />
              <span className="text-gray">Your Ratings</span>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Write your review here"
          />
        </Col>
        <Col span={24} className="flex items-center">
          <Row gutter={[8, 8]}>
            <Col span>
              <Space>
                Would you like to add a tip?
                <Checkbox
                  value={!hasTip}
                  onChange={(e) => setHasTip(!e.target.checked)}
                >
                  No
                </Checkbox>
              </Space>
            </Col>
            <Col span={24}>
              <InputNumber
                prefix="$"
                className="w-full"
                size="large"
                disabled={!hasTip}
                value={tipAmount}
                onChange={(value) => setTipAmount(value)}
                min={0}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} className="flex justify-center">
          <span className="text-gray">
            {FEE_RATE}% processing fee will be applied
          </span>
        </Col>
      </Row>

      <Divider />
    </Modal>
  );
};
