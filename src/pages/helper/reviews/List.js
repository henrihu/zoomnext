import { List } from 'antd';
import Card from './Card';

export default ({ total, page, data, onSetFilter, loading }) => {
  return (
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
      pagination={{
        pageSize: 5,
        size: 'small',
        total,
        page,
        onChange: (page) => {
          onSetFilter({ page });
        },
      }}
    />
  );
};
