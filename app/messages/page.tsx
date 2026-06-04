import { prisma } from '../../lib/prisma';

export const metadata = {
  title: 'Messages',
};

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <main className="site-shell">
      <div className="page-content">
        <h1>Messages</h1>
        <p>Latest messages submitted through the contact form.</p>
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.id} className="message-card">
              <div className="message-header">
                <strong>{message.name}</strong>
                <span>{message.email}</span>
              </div>
              <p>{message.body}</p>
              <time>{new Date(message.createdAt).toLocaleString()}</time>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
