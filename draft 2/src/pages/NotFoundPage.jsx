import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <main className="container page-section">
      <section className="card">
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist in this Draft 2 React app.</p>
        <Link className="button" to="/">Back to Landing</Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
