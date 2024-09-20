import Link from 'next/link';
import InfoBoxes from '@/components/info-boxes';
import Hero from '@/components/hero';

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <InfoBoxes />
    </div>
  );
};

export default HomePage;
