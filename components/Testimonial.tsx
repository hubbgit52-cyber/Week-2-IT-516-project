type TestimonialProps = {
  quote: string;
  name: string;
  title?: string;
};

export default function Testimonial({ quote, name, title }: TestimonialProps) {
  return (
    <article className="testimonial page-content">
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      <footer>
        <strong>{name}</strong>
        {title ? <span className="testimonial-title"> — {title}</span> : null}
      </footer>
    </article>
  );
}
