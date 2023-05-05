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

export default ({ open, data = {}, onOk, onCancel }) => {
  const [pending, setPending] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState();
  const [hasTip, setHasTip] = useState(true);
  const [tipAmount, setTipAmount] = useState();
  const modal_props = {
    title: 'Rate & Review',
    open,
    okText: 'Submit',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: async () => {
      setPending(true);
      const isSuccess = await onOk({
        id: data.id,
        providerRating: rating,
        ratingDesc: review,
        isTip: hasTip ? 1 : 0,
        tipAmount: hasTip ? tipAmount : 0,
      });
      if (isSuccess) {
        onCancel();
      }
      setPending(false);
    },
    confirmLoading: pending,
    onCancel,
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24} className="flex justify-center">
          <Row>
            <Col span={24} className="flex justify-center">
              <Avatar src={data.pvavatarImage} size={100} />
            </Col>
            <Col span={24} className="flex justify-center">
              <h2>{data.pvfullName}</h2>
            </Col>
            <Col span={24} className="flex justify-center items-center">
              <span className="text-gray mr-4">User Ratings</span>
              <Tag>
                <StarFilled style={{ color: '#FADB14' }} />
                <span className="text-bold">
                  <b>{data.providerRating}</b>
                  {/* ({helper.job_count}) */}
                </span>
              </Tag>
            </Col>
            <Col span={24} className="flex flex-col items-center">
              <Rate value={rating} onChange={(value) => setRating(value)} />
              <span className="text-gray">Your Ratings</span>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={review}
            placeholder="Write your review here"
            onChange={(e) => setReview(e.target.value)}
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
