"use client";

import { useState } from 'react';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.body.trim()) {
      setErrors(prev => ({
        name: !formData.name.trim() ? 'Name is required.' : prev.name,
        email: !formData.email.trim() ? 'Email is required.' : prev.email,
        body: !formData.body.trim() ? 'Please enter a message.' : prev.body,
      }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Submission failed');
      }

      setSuccess('Message sent — thank you!');
      setFormData({ name: '', email: '', body: '' });
    } catch (err: any) {
      setErrors(prev => ({ ...prev, body: err.message || 'Submission failed' }));
    } finally {
      setSubmitting(false);
    }
  }

  const handleBlur = (field: string) => {
    const value = formData[field as keyof typeof formData];
    let error = '';

    if (field === 'name' && !value.trim()) {
      error = 'Name is required.';
    } else if (field === 'email') {
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (field === 'body' && !value.trim()) {
      error = 'Please enter a message.';
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          required
          aria-describedby="name-error"
        />
        <span id="name-error" className="error-message" role="alert">{errors.name}</span>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          required
          aria-describedby="email-error"
        />
        <span id="email-error" className="error-message" role="alert">{errors.email}</span>
      </div>

      <div className="form-field">
        <label htmlFor="body">Message</label>
        <textarea
          id="body"
          name="body"
          rows={5}
          value={formData.body}
          onChange={handleChange}
          onBlur={() => handleBlur('body')}
          required
          aria-describedby="body-error"
        />
        <span id="body-error" className="error-message" role="alert">{errors.body}</span>
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
