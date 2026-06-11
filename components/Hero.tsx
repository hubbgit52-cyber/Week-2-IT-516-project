type HeroProps = {
  title: string;
  description: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="hero page-content">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>
    </section>
  );
}