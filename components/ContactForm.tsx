"use client";

import { useState } from 'react';
import { createMessage } from '../app/actions';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
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
    <form action={createMessage}>
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
