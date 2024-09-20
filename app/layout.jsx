import '@/app/globals.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property',
  description: 'Find the perfect ',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar></Navbar>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
