import { Link } from 'react-router';
import { features, steps } from '../data/features';

function LandingPage() {
  const featureCards = features.map(function(feature) {
    return (
      <article className="card feature-card" key={feature.id}>
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </article>
    );
  });

  const stepCards = steps.map(function(step) {
    return (
      <article className="card step-card" key={step.id}>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </article>
    );
  });

  return (
    <main>
      <section className="hero">
        <div className="container hero-layout">
          <div>
            <p className="muted-text">
              <strong>Your job search, organized and visualized</strong>
            </p>

            <h1>Your Job Search, Organized &amp; Visualized</h1>

            <p>
              Track saved jobs, applications, interviews, notes, and deadlines in one place
              so you can spend less time organizing and more time applying.
            </p>

            <div className="hero-actions">
              <Link className="button" to="/auth">Get Started</Link>
            </div>
          </div>

          <img
            className="hero-image decorative-image"
            src="/img/dashboard-preview.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section id="features" className="page-section">
        <div className="container">
          <div className="section-heading">
            <h2>Key Features</h2>
            <p className="muted-text">
              JobTrack helps you move from job search to saved applications and progress tracking.
            </p>
          </div>

          <div className="feature-grid">
            {featureCards}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="page-section">
        <div className="container">
          <div className="section-heading">
            <h2>How It Works</h2>
            <p className="muted-text">
              Save jobs, track applications, update progress, and review your search patterns.
            </p>
          </div>

          <div className="step-grid">
            {stepCards}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;