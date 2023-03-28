import { useSelector } from 'react-redux';
import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
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
  const { authenticated } = useSelector(({ auth }) => auth);
  return (
    <LandingLayout>
      <Meta title="Zoom Errands" description="Zoom Errands" />
      {authenticated ? <Hero /> : <Hero />}
      <Features />
      <Pricing />
      <Guides />
      <Testimonial />
      <CallToAction />
      <Footer />
    </LandingLayout>
  );
};

export default Home;
