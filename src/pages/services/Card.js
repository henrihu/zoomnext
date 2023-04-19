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
        width: 180,
        height: 180,
      }}
      onClick={onClick}
    >
      <img
        src={`/images/category_image/${data.image}`}
        className="rounded-lg w-full h-full"
        alt="job"
      />
      <div
        className="w-full h-full rounded-lg absolute top-0 left-0"
        style={{
          background: `linear-gradient(0deg, ${token.colorPrimary}80, transparent, transparent)`,
        }}
      >
        <h3 className="font-bold text-white text-center absolute w-full bottom-1">
          {data.name}
        </h3>
      </div>
    </Card>
  );
};
