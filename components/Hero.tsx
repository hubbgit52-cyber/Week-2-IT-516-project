import Image from 'next/image';

type HeroProps = {
  title: string;
  description: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="hero page-content full-bleed">
      <div className="hero-bg">
        <Image
          src="/hero.png"
          alt="Hero image"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay" />
      <div className="site-shell-inner">
        <div className="hero-content">
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
      </div>
    </section>
  );
}