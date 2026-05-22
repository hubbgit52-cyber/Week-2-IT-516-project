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

# Week 4: Component Architecture

## Component Hierarchy
```
RootLayout (Server)
├── Header (Client - contains ThemeToggle)
│   └── Nav (Server - uses Link)
├── main (children)
│   ├── HomePage (Server)
│   │   ├── Hero (Server)
│   │   └── Card (Server - reusable)
│   └── ContactPage (Server)
│       └── ContactForm (Client - useState for form fields/errors)
└── Footer (Server)
```

## Week 6: Async Data Fetch (This week's assignment)

- Data source chosen: Open-Meteo (no API key required).
- Endpoint used for demo: `https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true`
- Why Open-Meteo: no auth keys, minimal CORS friction, returns simple current weather payload useful for a concise UI demo.
- Notes: Implement a client component that fetches `current_weather`, shows a skeleton while loading, displays an accessible error state, and a refresh control to re-fetch. Respect `prefers-reduced-motion` for skeleton animations.


## Components Planned
- **Header**: Client component (needs ThemeToggle with state). Receives no props, holds theme state.
- **Nav**: Server component. Receives no props, renders navigation links.
- **Footer**: Server component. Receives no props, renders footer content.
- **Hero**: Server component. Receives title and description props for homepage hero section.
- **Card**: Server component. Receives title, description, href props for reusable content blocks.
- **ThemeToggle**: Client component (useState for theme, useEffect for localStorage).
- **ContactForm**: Client component (useState for form state and errors).

Client components are marked with "use client" only where needed for interactivity.
```
