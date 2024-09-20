import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="text-2xl">
      <Link href={'/properties'}> Go to Properties</Link>
    </div>
  );
};

export default HomePage;
