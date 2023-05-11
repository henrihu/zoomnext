import { Modal, Divider } from 'antd';
import { useRouter } from 'next/router';
import GoogleMap from '@/components/GoogleMap';
import { useDispatch } from 'react-redux';
import { setMessenger } from 'src/store/common/actions';
import { useMemo } from 'react';

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

  const origin = useMemo(
    () => ({
      lat: data && Number(data.pickUpLatitude),
      lng: data && Number(data.pickUpLongitude),
      text: 'Pick Up',
    }),
    [data]
  );

  const destination = useMemo(
    () => ({
      lat: data && Number(data.dropOffLatitude),
      lng: data && Number(data.dropOffLongitude),
      text: 'Drop Off',
    }),
    [data]
  );

  return (
    <Modal {...modal_props}>
      <Divider />
      <div style={{ width: '100%', height: '500px' }}>
        <GoogleMap
          defaultCenter={origin}
          origin={origin}
          destination={destination}
          markers={[origin, destination]}
        />
      </div>
      <Divider className="my-2" />
    </Modal>
  );
};
