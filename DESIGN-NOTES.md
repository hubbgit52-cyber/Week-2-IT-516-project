# Week 3 IT516: Interactive Features

## Feature 1: Theme Toggle
- What it does: Allows the user to switch between light mode and dark mode and remembers the choice using localStorage.
- Why it matters: It improves comfort and accessibility by letting users choose a display mode that works best for them.
- Events involved: `click` on the toggle button.
- State to track: the current theme mode (`light` or `dark`).
- Why this matters: Writing the event model first helps avoid the mistake of placing handlers on the wrong element or forgetting to connect the DOM element to the listener.

## Feature 2: Contact Form Validation
- What it does: Validates name, email, and message fields, shows inline errors, and displays a success message when the form is valid.
- Why it matters: It prevents invalid submissions and gives users immediate feedback on what needs correction.
- Events involved: `submit` on the form.
- State to track: whether the form is currently valid and what error messages are shown per field.
- Why this matters: Planning validation state before coding helps keep the logic clear and avoids buggy form behavior.
