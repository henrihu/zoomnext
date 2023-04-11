import { useState, useMemo } from 'react';

// Components
import { Divider, Row, Col, Steps, Button, Space, theme } from 'antd';
import DetailsStep from './DetailsStep';
import TermStep from './TermStep';

export default ({}) => {
  const [step, setStep] = useState(0);
  const { token } = theme.useToken();
  return (
    <Row justify="center" className="cursor-default" gutter={[16, 16]}>
      <Col span={24}>
        <Steps
          current={step}
          size="small"
          labelPlacement="vertical"
          onChange={(value) => setStep(value)}
          items={[
            { title: 'Details' },
            { title: 'Terms' },
            { title: 'Approval' },
          ]}
        />
      </Col>
      <Col span={24} className="flex justify-center">
        {step === 0 && <DetailsStep />}
        {step === 1 && <TermStep />}
        {step === 2 && (
          <Space
            direction="vertical"
            className="flex flex-col items-center font-bold"
          >
            <div>
              Congrats, you're a{' '}
              <span style={{ color: token.colorPrimary }}>Helper!</span>
            </div>
            <span>Let's start making some money!</span>
            <Button type="primary" shape="round">
              Okay
            </Button>
          </Space>
        )}
      </Col>
      {step < 2 && (
        <Col span={24}>
          <Divider style={{ margin: '4px 0px' }} />
        </Col>
      )}
      <Col span={24} className="flex justify-center">
        {step === 0 && (
          <Button type="primary" shape="round" onClick={() => setStep(1)}>
            Continue
          </Button>
        )}
        {step === 1 && (
          <Button type="primary" shape="round" onClick={() => setStep(2)}>
            Let's Make Some Money!
          </Button>
        )}
      </Col>
    </Row>
  );
};
