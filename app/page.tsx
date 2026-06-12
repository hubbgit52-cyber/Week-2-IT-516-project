import Hero from '../components/Hero';
import Card from '../components/Card';
import Testimonial from '../components/Testimonial';
import Testimonials from '../components/Testimonials';

const features = [
  {
    title: 'Custom Web Applications',
    description: 'Bespoke web apps built with modern frameworks to scale with your business.',
    href: '/services#web',
    image: '/web.svg'
  },
  {
    title: 'Cloud Architecture & DevOps',
    description: 'Resilient cloud infrastructure, CI/CD pipelines, and cost-optimised deployments.',
    href: '/services#cloud',
    image: '/cloud.svg'
  },
  {
    title: 'Product Design & UX',
    description: 'User-centred design, prototyping, and polished UI that converts.',
    href: '/services#design',
    image: '/design.svg'
  },
  {
    title: 'Data Engineering & ML',
    description: 'Data pipelines, analytics, and machine learning to unlock business insights.',
    href: '/services#data',
    image: '/data.svg'
  }
];

export default function HomePage() {
  return (
    <>
      <Hero
        title="Acme Studios"
        description="Welcome to the Acme Software Studio Website. We build reliable, scalable web applications for startups and enterprises."
      />
      <div className="features-grid">
        {features.map((feature, index) => (
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            image={feature.image}
          />
        ))}
      </div>

      <section className="testimonials-section">
        <h2>What our clients say</h2>
        <div className="testimonials-grid">
          <Testimonial
            quote="Acme Studios transformed our product in weeks—clean code, thoughtful UX, and zero deployment headaches."
            name="Emily Carter"
            title="VP Product, BrightLeaf"
          />
          <Testimonial
            quote="The team handled a complex migration flawlessly and improved our CI/CD pipeline—reliable and responsive partners."
            name="Michael Thompson"
            title="CTO, NovaMetrics"
          />
          <Testimonial
            quote="Design and execution were top-notch. Our conversion rates improved within the first month. Highly recommended."
            name="Samantha Reed"
            title="Founder, LumenCo"
          />
        </div>
      </section>
      <Testimonials />
    </>
  );
}
