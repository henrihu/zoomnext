import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAuth } from 'src/store/auth/actions';
import { useThemeToken } from 'src/utils/common';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      router.push('/services');
    }
  }, [router]);

  return (
    <main
      className="relative flex flex-col items-center justify-center h-screen max-h-screen overflow-auto p-10 transition"
      style={{
        backgroundColor: useThemeToken().colorPrimary,
        transition: 'background-color 0.5s',
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
