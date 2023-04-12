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
      Want to support this project? 1. Consider purchasing from our marketplace
      (soon) 2. Subscribe to our newsletter. We send out tips and tools for you
      to try out while building your SaaS 3. If you represent company, consider
      becoming a recurring sponsor for this repository 4. Submit issues and
      features. Fork the project. Give it some stars. Join the discussion 5.
      Share Nextacular with your network An open-source starter kit that will
      help you build full-stack multi-tenant SaaS platforms efficiently and help
      you focus on developing your core SaaS features. Built on top of popular
      and modern technologies such as Next JS, Tailwind, Prisma, and Stripe
    </Modal>
  );
};
