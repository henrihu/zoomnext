import { Button, List } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import PaymentHistoryCard from './Card';

export default ({ page, data, onSetFilter, loading, hasMore }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <List
        itemLayout="horizontal"
        dataSource={data}
        split
        className="w-full"
        loading={loading}
        renderItem={(item, index) => (
          <div className="mb-2">
            <PaymentHistoryCard data={item} key={index} />
          </div>
        )}
      />
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
    </div>
  );
};
