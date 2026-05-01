"use client";

let contactFormInitialized = false;

function updateStatus(message: string, isSuccess: boolean) {
  const status = document.getElementById('form-status');
  if (!status) return;
  status.textContent = message;
  status.className = isSuccess ? 'success-message form-status' : 'error-message form-status';
}

function setFieldError(fieldId: string, message: string) {
  const error = document.getElementById(`${fieldId}-error`);
  if (!error) return;
  error.textContent = message;
}

function clearFieldErrors() {
  ['name', 'email', 'message'].forEach((field) => {
    setFieldError(field, '');
  });
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(fieldId: string, value: string) {
  let error = '';
  if (fieldId === 'name' && !value.trim()) {
    error = 'Name is required.';
  } else if (fieldId === 'email') {
    if (!value.trim()) {
      error = 'Email is required.';
    } else if (!validateEmail(value)) {
      error = 'Please enter a valid email address.';
    }
  } else if (fieldId === 'message' && !value.trim()) {
    error = 'Please enter a message.';
  }
  setFieldError(fieldId, error);
  return !error;
}

function initContactForm() {
  if (contactFormInitialized || typeof window === 'undefined') return;
  contactFormInitialized = true;

  setTimeout(() => {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    if (!form) return;

    // Inline validation on blur
    ['name', 'email', 'message'].forEach((fieldId) => {
      const input = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement;
      if (input) {
        input.addEventListener('blur', () => {
          validateField(fieldId, input.value);
        });
        input.addEventListener('input', () => {
          // Clear error on input if previously invalid
          if (document.getElementById(`${fieldId}-error`)?.textContent) {
            validateField(fieldId, input.value);
          }
        });
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      updateStatus('', false);

      const formData = new FormData(form);
      const name = (formData.get('name') as string).trim();
      const email = (formData.get('email') as string).trim();
      const message = (formData.get('message') as string).trim();

      const nameValid = validateField('name', name);
      const emailValid = validateField('email', email);
      const messageValid = validateField('message', message);

      if (!nameValid || !emailValid || !messageValid) {
        updateStatus('Please fix the errors above before sending.', false);
        return;
      }

      updateStatus('Thank you! Your message has been received.', true);
      form.reset();
      clearFieldErrors();
    });
  }, 0);
}

export default function ContactForm() {
  if (typeof window !== 'undefined') {
    initContactForm();
  }

  return (
    <form id="contact-form" noValidate>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required aria-describedby="name-error" />
        <span id="name-error" className="error-message" role="alert"></span>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required aria-describedby="email-error" />
        <span id="email-error" className="error-message" role="alert"></span>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required aria-describedby="message-error" />
        <span id="message-error" className="error-message" role="alert"></span>
      </div>

      <button type="submit">Send Message</button>
      <div id="form-status" className="form-status" aria-live="polite"></div>
    </form>
  );
}
