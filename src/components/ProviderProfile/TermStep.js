import { Checkbox, Row, Col, Button } from 'antd';

export default ({
  backgroundCheck,
  conditionCheck,
  setBackgroundCheck,
  setConditionCheck,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Checkbox
          checked={backgroundCheck}
          onChange={(e) => setBackgroundCheck(e.target.checked)}
        >
          <div className="flex flex-col items-start">
            <span>I concent to a background check.</span>
            <Button type="link" size="small">
              Click here for details.
            </Button>
          </div>
        </Checkbox>
      </Col>
      <Col span={24}>
        <Checkbox
          checked={conditionCheck}
          onChange={(e) => setConditionCheck(e.target.checked)}
        >
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
