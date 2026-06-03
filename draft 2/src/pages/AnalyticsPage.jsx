import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import StatCard from '../components/StatCard';
import BarRow from '../components/BarRow';
import { analyticsStats } from '../data/stats';

function AnalyticsPage(props) {
  const educationRows = [
    { id: 1, label: 'Bachelor', percent: 33 },
    { id: 2, label: 'PhD', percent: 30 },
    { id: 3, label: 'Master', percent: 36 }
  ];

  const locationRows = [
    { id: 1, label: 'San Francisco, CA', percent: 25 },
    { id: 2, label: 'Los Angeles, CA', percent: 20 },
    { id: 3, label: 'New York', percent: 18 }
  ];

  function countJobsByStatus(statusName) {
    const matchingJobs = props.jobs.filter(function(job) {
      return job.status === statusName;
    });

    return matchingJobs.length;
  }

  function countJobsByVisa(visaText) {
    const matchingJobs = props.jobs.filter(function(job) {
      return job.sponsorship === visaText;
    });

    return matchingJobs.length;
  }

  function getPercent(count) {
    if (props.jobs.length === 0) {
      return 0;
    }

    return Math.round((count / props.jobs.length) * 100);
  }

  const statusRows = [
    { id: 1, label: 'Saved', count: countJobsByStatus('Saved') },
    { id: 2, label: 'Applied', count: countJobsByStatus('Applied') },
    { id: 3, label: 'Interview', count: countJobsByStatus('Interview') },
    { id: 4, label: 'Offer', count: countJobsByStatus('Offer') },
    { id: 5, label: 'Rejected', count: countJobsByStatus('Rejected') }
  ];

  const visaRows = [
    { id: 1, label: 'Sponsors visa', count: countJobsByVisa('Sponsors visa') },
    { id: 2, label: 'No sponsorship', count: countJobsByVisa('No sponsorship') }
  ];

  const statCards = analyticsStats.map(function(stat) {
    return <StatCard key={stat.id} value={stat.value} label={stat.label} />;
  });

  const statusBars = statusRows.map(function(row) {
    return (
      <div key={row.id}>
        <BarRow label={row.label + ' (' + row.count + ')'} percent={getPercent(row.count)} />
      </div>
    );
  });

  const educationBars = educationRows.map(function(row) {
    return <BarRow key={row.id} label={row.label} percent={row.percent} />;
  });

  const locationBars = locationRows.map(function(row) {
    return <BarRow key={row.id} label={row.label} percent={row.percent} />;
  });

  const visaBars = visaRows.map(function(row) {
    return (
      <div key={row.id}>
        <BarRow label={row.label + ' (' + row.count + ')'} percent={getPercent(row.count)} />
      </div>
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Analytics &amp; Insight</h1>
          <p className="muted-text">Review job search patterns based on the jobs currently saved in JobTrack.</p>
        </div>
        <Link className="button" to="/jobs">Search More Jobs</Link>
      </div>

      <section className="card">
        <div>
          <h2>Analytics Filters</h2>
          <p className="muted-text">Choose a job type or company to imagine how future analytics could be filtered.</p>
        </div>
        <form className="form-stack">
          <div className="settings-grid">
            <div className="form-row">
              <label htmlFor="preferred-type">Preferred Job Type</label>
              <select id="preferred-type" name="preferred-type">
                <option>All job types</option>
                <option>Software Engineering</option>
                <option>Data Analyst</option>
                <option>Product / UX</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="company-filter">Company</label>
              <input id="company-filter" name="company-filter" type="text" placeholder="Company" />
            </div>
          </div>
        </form>
      </section>

      <section className="stats-grid">
        {statCards}
      </section>

      <section className="analytics-grid">
        <article className="card">
          <h2>Application Status Distribution</h2>
          <div className="bar-list">
            {statusBars}
          </div>
          <p className="muted-text">This chart summarizes how many saved jobs are in each application stage.</p>
        </article>

        <article className="card">
          <h2>Education Level</h2>
          <div className="bar-list">
            {educationBars}
          </div>
        </article>

        <article className="card">
          <h2>Top Locations</h2>
          <div className="bar-list">
            {locationBars}
          </div>
        </article>

        <article className="card">
          <h2>Visa Sponsorship</h2>
          <div className="bar-list">
            {visaBars}
          </div>
          <p className="muted-text">This chart helps users quickly see which saved jobs may support visa sponsorship.</p>
        </article>
      </section>
    </PageLayout>
  );
}

export default AnalyticsPage;
