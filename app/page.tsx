export default function HomePage() {
  return (
    <section className="page-content">
      <h2>Home</h2>
      <p>
        Welcome to the Project Website. This homepage introduces the features built for Week 3, including a theme
        toggle and form validation powered by vanilla JavaScript.
      </p>
      <p>
        The goal is to move beyond static markup and learn how browser events, DOM selection, and manual state
        management work together without React hooks.
      </p>
      <h3>Interactive features included</h3>
      <ul>
        <li>Theme toggle that persists the user preference across pages and reloads.</li>
        <li>Contact form validation with inline error messages and success feedback.</li>
      </ul>
    </section>
  );
}
