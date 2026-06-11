"use client";

import { useEffect, useRef, useState } from 'react';

type CardProps = {
  title: string;
  description: string;
  href?: string;
  image?: string;
};

export default function Card({ title, description, href, image }: CardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className={`card page-content ${visible ? 'reveal is-visible' : ''}`}>
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        {href && <a href={href}>Learn more</a>}
      </div>
    </article>
  );
}