import './globals.css';
import Header from '../components/Header';
import AuthButtonServer from '../components/AuthButtonServer';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Project Website',
  description: 'A Week 4 React component architecture project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Header />
          <div className="header-auth">{/* server component */}
            <AuthButtonServer />
          </div>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
