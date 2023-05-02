import { Modal, Divider } from 'antd';
import { useRouter } from 'next/router';
import GoogleMap from '@/components/GoogleMap';
import { useDispatch } from 'react-redux';
import { setMessenger } from 'src/store/common/actions';

export default ({ open, onCancel, data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const modal_props = {
    title: 'My Assigned Jobs',
    open,
    okText: 'Send Message',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: () => {
      dispatch(
        setMessenger({
          firstName: data.firstName,
          lastName: data.lastName,
          jobId: data.id,
          userId: data.userId,
        })
      );
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
