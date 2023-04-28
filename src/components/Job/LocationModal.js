import { Modal, Divider } from 'antd';
import { useRouter } from 'next/router';

export default ({ open, onOk, onCancel }) => {
  const router = useRouter();
  const modal_props = {
    title: 'MyAssignedJobs',
    open,
    okText: 'Send Message',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: () => {
      router.push('/message');
    },
    onCancel,
  };
  return (
    <Modal {...modal_props}>
      <Divider />
      <div style={{ height: '500px' }}>HERE IS MAP</div>
      <Divider className="my-2" />
    </Modal>
  );
};
