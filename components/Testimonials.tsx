"use client";

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Acme delivered a polished product on time — the team was communicative and proactive throughout.',
      name: 'Laura Bennett',
      title: 'Founder, Brightleaf'
    },
    {
      quote: 'Their engineers turned our vague idea into a stable platform. Highly recommend for startups.',
      name: 'Michael Carter',
      title: 'CTO, TruScale'
    },
    {
      quote: 'Professional, design-minded, and technically excellent — our conversion rates improved after launch.',
      name: 'Emily Ross',
      title: 'Head of Product, Neonline'
    }
  ];

  return (
    <section className="testimonials-section page-content" aria-label="Client testimonials">
      <h2>What our clients say</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="testimonial-card">
            <p className="quote">“{t.quote}”</p>
            <footer className="credit">— <strong>{t.name}</strong>, <span className="role">{t.title}</span></footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
