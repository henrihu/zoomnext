import Meta from '@/components/Meta';

export default () => {
  return (
    <>
      <Meta
        title="Payout Settings | Zoom Errands"
        description="Zoom Errands"
        label="Payout Settings"
      />
      <iframe
        name="I1"
        id="if1"
        width="100%"
        height="100vh"
        style={{ height: '100vh' }}
        src="http://10.97.5.121/elog/url/list?flag=dev&url=connect.stripe"
      ></iframe>
    </>
  );
};
