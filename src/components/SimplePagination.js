import { Button } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default ({ hasMore, page, onSetFilter }) => {
  return (
    <div className="flex justify-between w-full">
      <Button
        type="link"
        size="small"
        icon={<ArrowLeftOutlined />}
        disabled={page === 1}
        onClick={() => onSetFilter({ page: page - 1 })}
      >
        Prev Page
      </Button>
      <Button
        type="link"
        size="small"
        icon={<ArrowRightOutlined />}
        disabled={!hasMore}
        onClick={() => onSetFilter({ page: page + 1 })}
      >
        Next Page
      </Button>
    </div>
  );
};
