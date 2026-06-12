import './globals.css';
import Header from '../components/Header';
import AuthButtonServer from '../components/AuthButtonServer';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Acme Software Studio',
  description: 'Acme Software Studio - Project Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Header authButton={<AuthButtonServer />} />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
