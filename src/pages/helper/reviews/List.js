import SimplePagination from '@/components/SimplePagination';
import { List } from 'antd';
import Card from './Card';

export default ({ hasMore, page, data, onSetFilter, loading }) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        split
        loading={loading}
        renderItem={(item, index) => (
          <div className="mb-2">
            <Card data={item} key={index} />
          </div>
        )}
      />
      <SimplePagination
        hasMore={hasMore}
        page={page}
        onSetFilter={onSetFilter}
      />
    </>
  );
};
