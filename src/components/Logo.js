import { CUSTOMER, HELPER, TYPE_CUSTOMER } from 'src/utils/constants';

export default ({ type = TYPE_CUSTOMER, ...props }) => {
  return (
    <img
      src={type === TYPE_CUSTOMER ? CUSTOMER.logoUrl : HELPER.logoUrl}
      width={200}
      height={40}
      alt="Zoom Errands"
      {...props}
    />
  );
};
