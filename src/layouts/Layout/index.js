import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import Notification from '../Notification';
import { useAuth } from 'src/store/auth/actions';
import { useScreen } from 'src/utils/common';
import { TYPE_HELPER } from 'src/utils/constants';
import ProviderProfile from '@/components/ProviderProfile';
import { setProfileModal } from 'src/store/setting/actions';

export default ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { authenticated, type, userDetail } = useAuth();
  const isXsSm = useScreen();

  useEffect(() => {
    if (!authenticated) {
      router.push('/auth/login/');
    }
  }, [router]);

  useEffect(() => {
    if (userDetail && !userDetail.isProviderprofileCompleted) {
      dispatch(setProfileModal({ open: true }));
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Layout.Content
        style={{
          padding: isXsSm ? 16 : 32,
          minHeight: 'calc(100vh - 105px - 64px)',
        }}
      >
        {children}
      </Layout.Content>
      <Footer />
      <Notification />
      {type === TYPE_HELPER && <ProviderProfile />}
    </Layout>
  );
};
