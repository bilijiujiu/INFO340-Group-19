import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import StatCard from '../components/StatCard';
import { quickInsights } from '../data/stats';

function DashboardPage(props) {
  const recentJobs = props.jobs.slice(0, 6);

  const summaryStats = [
    { id: 1, value: props.jobs.length, label: 'Saved Jobs' },
    {
      id: 2,
      value: props.jobs.filter(function(job) { return job.status === 'Applied'; }).length,
      label: 'Applied'
    },
    {
      id: 3,
      value: props.jobs.filter(function(job) { return job.status === 'Interview'; }).length,
      label: 'Interviews'
    },
    {
      id: 4,
      value: props.jobs.filter(function(job) { return job.status === 'Offer'; }).length,
      label: 'Offers'
    }
  ];

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Welcome back, Peitong!</h1>
          <p className="muted-text">You have several jobs that need attention this week.</p>
        </div>
        <Link className="button" to="/add-job">+ Add Job</Link>
      </div>

      <section className="stats-grid">
        {summaryStats.map(function(stat) {
          return <StatCard key={stat.id} value={stat.value} label={stat.label} />;
        })}
      </section>

      <section className="card">
        <h2>Recent Applications</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(function(job) {
                return (
                  <tr key={job.id}>
                    <td>
                      <div className="company-heading table-company-heading">
                        <img className="company-logo table-company-logo" src={job.logo} alt="" aria-hidden="true" />
                        <span>{job.company}</span>
                      </div>
                    </td>
                    <td>{job.role}</td>
                    <td>{job.status}</td>
                    <td>{job.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Quick Insights</h2>
        <div className="stats-grid">
          {quickInsights.map(function(stat) {
            return <StatCard key={stat.id} value={stat.value} label={stat.label} />;
          })}
        </div>
      </section>
    </PageLayout>
  );
}

export default DashboardPage;
