import Logo from '@/components/Logo';
import { Spin } from 'antd';

export default () => {
  return (
    <div className="loading-container">
      <Logo width={200} height={100} />
      <Spin spinning={true} />
    </div>
  );
};
