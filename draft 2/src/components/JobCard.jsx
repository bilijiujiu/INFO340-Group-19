import { Link } from 'react-router';

function JobCard(props) {
  const job = props.job;

  return (
    <article className="card job-card">
      <header className="company-heading">
        <img 
          className="company-logo" 
          src={job.logo} 
          alt={`${job.company} logo`} 
        />

        <div>
          <p className="company-name">{job.company}</p>
          <h3 className="job-title">{job.role}</h3>
        </div>
      </header>

      <div className="job-meta">
        <span>{job.location}</span>    <span>{job.salary}</span>    <span>{job.experience}</span>
      </div>

      <p className="sponsorship-badge">{job.sponsorship}</p>

      <div className="job-actions">
        <Link className="button" to={`/jobs/${job.id}`}>
          View Details
        </Link>

        <button 
          className="button secondary-button" 
          type="button" 
          onClick={() => props.onSave(job)}
          aria-label={`Save ${job.role} at ${job.company}`}
        >
          Save
        </button>
      </div>
    </article>
  );
}

export default JobCard;