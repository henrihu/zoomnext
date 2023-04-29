import { Button, Col, Input, Row } from 'antd';
import { useState } from 'react';

import SearchLocation from '@/components/SearchLocation';

export default () => {
  const [location, setLocation] = useState('');
  return (
    <Row>
      <Col span={24}>
        <SearchLocation
        //   value={location}
        //   onChange={(value) => {
        //     setLocation(value);
        //     console.log('value', value);
        //   }}
        />
      </Col>
      <Col span={24}>
        <Button type="primary">Button</Button>
      </Col>
    </Row>
  );
};
