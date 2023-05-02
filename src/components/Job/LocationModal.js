import { Modal, Divider } from 'antd';
import { useRouter } from 'next/router';
import GoogleMap from '@/components/GoogleMap';

export default ({ open, onOk, onCancel, data }) => {
  const router = useRouter();
  const modal_props = {
    title: 'My Assigned Jobs',
    open,
    okText: 'Send Message',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: () => {
      router.push('/message');
    },
    onCancel,
    width: '100vw',
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <div style={{ width: '100%', height: '500px' }}>
        <GoogleMap
          defaultCenter={{
            lat: data && Number(data.pickUpLatitude),
            lng: data && Number(data.pickUpLongitude),
          }}
          origin={{
            lat: data && Number(data.pickUpLatitude),
            lng: data && Number(data.pickUpLongitude),
          }}
          destination={{
            lat: data && Number(data.dropOffLatitude),
            lng: data && Number(data.dropOffLongitude),
          }}
        />
      </div>
      <Divider className="my-2" />
    </Modal>
  );
};
