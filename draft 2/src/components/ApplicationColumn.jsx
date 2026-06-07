import { Link } from 'react-router';

function ApplicationColumn(props) {
  const jobCards = props.jobs.map(function(job) {
    const detailId = job.key || job.id;
    const logoSrc = job.logo || '/img/logos/generic.svg';

    function handleDeleteClick() {
      props.onDelete(job);
    }

    return (
      <article className="kanban-card" key={detailId}>
        <div className="company-heading small-company-heading">
          <img
            className="company-logo small-company-logo"
            src={logoSrc}
            alt=""
            aria-hidden="true"
          />
          <div>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
          </div>
        </div>

        <div className="job-actions">
          <Link className="button secondary-button" to={`/jobs/${detailId}`}>View Details</Link>
          <button className="button secondary-button" type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
      </article>
    );
  });

  return (
    <section className="kanban-column">
      <div className="column-heading">
        <img
          className="status-icon"
          src={props.icon}
          alt=""
          aria-hidden="true"
        />
        <div>
          <h2>{props.title} ({props.jobs.length})</h2>
          <p className="muted-text">{props.jobs.length} jobs</p>
        </div>
      </div>

      {jobCards}

      {props.jobs.length === 0 && (
        <p className="muted-text">No jobs in this status yet.</p>
      )}

      <Link className="button secondary-button" to="/add-job">+ Add Job</Link>
    </section>
  );
}

export default ApplicationColumn;
