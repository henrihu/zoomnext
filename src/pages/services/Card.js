import { Card } from 'antd';
import Image from 'next/image';
import { theme } from 'antd';

export default ({ data, onClick }) => {
  const { token } = theme.useToken();
  return (
    <Card
      hoverable
      bodyStyle={{
        padding: 0,
        width: 150,
        height: 150,
      }}
      onClick={onClick}
    >
      <Image
        src={`/images/category_image/${data.image}`}
        fill
        className="rounded-lg"
        alt="job"
        // style={{ border: `2px solid ${token.colorPrimary}` }}
      />
      <h3
        className="font-bold text-white text-center"
        style={{
          position: 'absolute',
          bottom: 8,
          width: '100%',
          // backgroundColor: token.colorPrimary,
          alpha: 0.5,
        }}
      >
        {data.name}
      </h3>
    </Card>
  );
};
