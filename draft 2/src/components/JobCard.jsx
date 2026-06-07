import { Link } from 'react-router';

function JobCard(props) {
  const job = props.job;
  const detailId = job.key || job.id;
  const logoSrc = job.logo || '/img/logos/generic.svg';

  function handleDeleteClick() {
    props.onDelete(job);
  }

  return (
    <article className="card job-card">
      <header className="company-heading">
        <img
          className="company-logo"
          src={logoSrc}
          alt={`${job.company} logo`}
        />

        <div>
          <p className="company-name">{job.company}</p>
          <h3 className="job-title">{job.role}</h3>
        </div>
      </header>

      <div className="job-meta">
        <span>{job.location}</span>
        <span>{job.salary}</span>
        <span>{job.experience}</span>
      </div>

      <p className="sponsorship-badge">{job.sponsorship}</p>

      <div className="job-actions">
        <Link className="button" to={`/jobs/${detailId}`}>
          View Details
        </Link>

        <button
          className="button secondary-button"
          type="button"
          onClick={props.onSave}
        >
          Save
        </button>

        <button
          className="button secondary-button"
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default JobCard;
