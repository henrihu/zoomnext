import { CustomerLayout } from 'src/layouts';
import Meta from '@/components/Meta/index';

export default () => {
  return (
    <CustomerLayout>
      <Meta
        title="Zoom Errands | Customer Dashboard"
        description="Zoom Errands"
      />
      <h1 style={{ minHeight: 1000 }}>Hello!</h1>
    </CustomerLayout>
  );
};
