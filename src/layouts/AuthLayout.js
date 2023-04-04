import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children, color }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { authenticated, type } = useSelector(({ auth }) => auth);

  useEffect(() => {
    setTheme('light');

    if (authenticated) {
      router.push(`/${type}/services`);
    }
  }, [setTheme, router]);

  return (
    <main
      className="relative flex flex-col items-center justify-center h-screen p-10 space-y-10 transition"
      style={{
        backgroundColor: color,
        //  transition: 'background-color 0.5s'
      }}
    >
      <Toaster position="bottom-center" toastOptions={{ duration: 10000 }} />
      {children}
    </main>
  );
};

export default AuthLayout;
