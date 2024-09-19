import '@/app/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property',
  description: 'Find the perfect ',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
