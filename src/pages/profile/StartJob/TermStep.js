import { Checkbox, Row, Col, Button } from 'antd';

export default () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Checkbox checked>
          <div className="flex flex-col items-start">
            <span>I concent to a background check.</span>
            <Button type="link" size="small">
              Click here for details.
            </Button>
          </div>
        </Checkbox>
      </Col>
      <Col span={24}>
        <Checkbox checked>
          <div className="flex flex-col items-start">
            <span>I agree to helpers conditions.</span>
            <Button type="link" size="small">
              Click here for details.
            </Button>
          </div>
        </Checkbox>
      </Col>
    </Row>
  );
};
