import { Spin } from 'antd';
import Image from 'next/image';

export default () => {
  return (
    <div className="loading-container">
      <Image src="/images/login_logo.jpg" width={200} height={100} />
      <Spin spinning={true} />
    </div>
  );
};
