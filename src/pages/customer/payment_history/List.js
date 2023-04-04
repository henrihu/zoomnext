import { List } from 'antd';
import PaymentHistoryCard from './Card';

export default ({ total, page, data, onSetFilter }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      split
      renderItem={(item, index) => (
        <div className="mb-2">
          <PaymentHistoryCard data={item} key={index} />
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
