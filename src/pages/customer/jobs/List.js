import { useRouter } from 'next/router';

// Components
import { List } from 'antd';
import JobCard from 'src/components/Job/JobCard';
import SimplePagination from 'src/components/SimplePagination';

// Constants
import { TYPE_CUSTOMER } from 'src/utils/constants';

export default ({ hasMore, page, data, onSetFilter }) => {
  const router = useRouter();
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        split
        renderItem={(item, index) => (
          <div className="mb-3">
            <JobCard
              data={item}
              key={index}
              type={TYPE_CUSTOMER}
              onDetail={() => router.push(`/customer/jobs/${item.jobSlug}/`)}
              onCancel={null}
            />
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
