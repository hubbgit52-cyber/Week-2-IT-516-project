import './globals.css';
import Header from '../components/Header';
import AuthButtonServer from '../components/AuthButtonServer';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: 'Project Website',
  description: 'A Week 4 React component architecture project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Header authButton={<AuthButtonServer />} />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
