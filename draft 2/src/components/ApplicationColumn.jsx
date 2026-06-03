import { Link } from 'react-router';

function ApplicationColumn(props) {
  const jobCards = props.jobs.map(function(job) {
    return (
      <article className="kanban-card" key={job.id}>
        <div className="company-heading small-company-heading">
          <img
            className="company-logo small-company-logo"
            src={job.logo}
            alt=""
            aria-hidden="true"
          />
          <div>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
          </div>
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

      <Link className="button secondary-button" to={props.buttonLink}>{props.buttonText}</Link>
    </section>
  );
}

export default ApplicationColumn;
