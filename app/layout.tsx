import './globals.css';
import Header from '../components/Header';
import AuthStatus from '../components/AuthStatus';
import SessionProviderClient from '../components/SessionProviderClient';
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
        <SessionProviderClient>
          <div className="site-shell">
            <Header authButton={<AuthStatus />} />
            <main>{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </SessionProviderClient>
      </body>
    </html>
  );
}
