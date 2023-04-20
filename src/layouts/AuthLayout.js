import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { theme } from 'antd';
import { useAuth } from 'src/store/auth/actions';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const { authenticated } = useAuth();

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
