import { Layout, theme } from 'antd';

export default () => {
  const { token } = theme.useToken();
  return (
    <Layout.Footer
      className="bg-white text-center min-h-64 max-h-64 font-bold cursor-default"
      style={{ boxShadow: `${token.colorPrimary} 0px -1px 5px` }}
    >
      Zoom Errands ©2023 Created by Zoom Errands
    </Layout.Footer>
  );
};
