import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

// Components
import { List } from 'antd';
import JobCard from 'src/components/Job/JobCard';

// Constants
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';

export default ({ total = 0, data = [], type }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const result = useMemo(
    () => (total < 3 ? data : data.slice((page - 1) * 3, page * 3)),
    [page, total, data]
  );
  return (
    <List
      itemLayout="horizontal"
      dataSource={result}
      split
      renderItem={(item, index) => (
        <div className="mb-3">
          <JobCard
            data={item}
            key={index}
            type={TYPE_HELPER}
            onDetail={() => router.push(`/helper/browse_jobs/${item.jobSlug}/`)}
            isCancelExist={type === TYPE_CUSTOMER}
          />
        </div>
      )}
      pagination={{
        pageSize: 3,
        size: 'small',
        total,
        page,
        onChange: (p) => {
          setPage(p);
        },
      }}
    />
  );
};
