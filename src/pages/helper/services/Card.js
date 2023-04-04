import { Card } from 'antd';
import Image from 'next/image';

export default ({ data }) => {
  return (
    <Card
      hoverable
      bodyStyle={{
        padding: 0,
        width: 150,
        height: 150,
      }}
    >
      <Image
        src="/images/service.png"
        fill
        style={{ borderRadius: 8 }}
        alt="job"
      />
      <h3
        className="font-bold text-white text-center"
        style={{ position: 'absolute', bottom: 8, width: '100%' }}
      >
        {data.label}
      </h3>
    </Card>
  );
};
