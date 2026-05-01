import './globals.css';
import SiteNav from '../components/SiteNav';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: 'Project Website',
  description: 'A Week 3 interactive website built with Next.js and vanilla JavaScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div>
              <h1>Project Website</h1>
              <p>Week 3 project: semantic pages with vanilla JS interactivity.</p>
            </div>
            <div className="header-controls">
              <ThemeToggle />
            </div>
          </header>

          <SiteNav />

          <main>{children}</main>

          <footer className="site-footer">
            <p>© 2026 Project Website. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
