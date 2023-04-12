import { useSelector } from 'react-redux';
import Meta from '@/components/Meta/index';
import { GuestLayout } from '@/layouts/index';
import {
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
} from '@/sections/index';

const Home = () => {
  return (
    <GuestLayout>
      <Meta title="Zoom Errands" description="Zoom Errands" />
      <Features />
      <Pricing />
      <Guides />
      <Testimonial />
      <CallToAction />
      <Footer />
    </GuestLayout>
  );
};

export default Home;
