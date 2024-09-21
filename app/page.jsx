import InfoBoxes from '@/components/info-boxes';
import Hero from '@/components/hero';
import HomeProperties from '@/components/home-properties';
import connectDB from '@/config/database';

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <HomeProperties />
      <InfoBoxes />
    </div>
  );
};

export default HomePage;
