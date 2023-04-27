import { Card, Checkbox } from 'antd';
import { useThemeToken } from 'src/utils/common';

// id	1
// name	"Home Cleaning"
// slug	"home-cleaning"
// type	"Cleaning"
// image	"http://10.97.5.48:8000/images/category_image/category_1608388744_s2lg5p.jpg"
// isSelectCategory

export default ({ data, onClick }) => {
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
      <img src={data.image} className="rounded-lg w-full h-full" alt="job" />
      <Checkbox
        checked={data.isSelectCategory}
        className="absolute right-2 top-2"
      />
      <div
        className="w-full h-full rounded-lg absolute top-0 left-0"
        style={{
          background: `linear-gradient(0deg, ${
            useThemeToken().colorPrimary
          }80, transparent, transparent)`,
        }}
      >
        <h3 className="font-bold text-white text-center absolute w-full bottom-1">
          {data.name}
        </h3>
      </div>
    </Card>
  );
};
