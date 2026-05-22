import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/data">Weather</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}