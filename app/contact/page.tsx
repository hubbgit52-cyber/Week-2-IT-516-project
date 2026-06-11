import ContactForm from '../../components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <section className="page-content">
      <h2>Contact</h2>
      <p>
        Use the form below to send as a message. Include the services you're interested in and we'll get back to you as soon as possible.
      </p>
      <p>
        This page shares the theme toggle from the header so the interactive design is consistent across routes.
      </p>

      <div className="form-card">
        <h3>Send a message</h3>
        <ContactForm />
      </div>

      <div className="form-actions">
        <Link href="/messages">
          <button type="button" className="btn">View Messages</button>
        </Link>
      </div>
    </section>
  );
}
