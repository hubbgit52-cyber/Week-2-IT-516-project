import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
