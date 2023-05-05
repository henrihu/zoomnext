import { Modal, Divider } from 'antd';

export default ({ open, onCancel }) => {
  const modal_props = {
    title: 'Terms & Conditions',
    open,
    onCancel,
    centered: true,
    footer: null,
    centered: true,
    width: 400,
  };
  return (
    <Modal {...modal_props}>
      <Divider style={{ margin: '8px 0px' }} />
    </Modal>
  );
};
