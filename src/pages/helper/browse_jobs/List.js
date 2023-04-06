import { useRouter } from 'next/router';

// Components
import { List } from 'antd';
import JobCard from 'src/components/JobCard';

// Constants
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';

export default ({ total, page, data, onSetFilter }) => {
  const router = useRouter();
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      split
      renderItem={(item, index) => (
        <div className="mb-3">
          <JobCard
            data={item}
            key={index}
            type={TYPE_HELPER}
            onDetail={() => router.push(`/helper/jobs/${data.title}/`)}
            onCancel={null}
          />
        </div>
      )}
      pagination={{
        pageSize: 3,
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
