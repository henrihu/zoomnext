import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { theme } from 'antd';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const { authenticated } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (authenticated) {
      router.push('/services');
    }
  }, [router]);

  return (
    <main
      className="relative flex flex-col items-center justify-center h-screen p-10 transition"
      style={{
        backgroundColor: token.colorPrimary,
        transition: 'background-color 0.5s',
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
