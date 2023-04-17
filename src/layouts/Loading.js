import { Spin } from 'antd';

export default () => {
  return (
    <Spin
      spinning={true}
      style={{
        minHeight: '100vh',
        minWidth: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};
