import '@/app/globals.css';
import AuthProvider from '@/components/auth-provider';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property',
  description: 'Find the perfect ',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
