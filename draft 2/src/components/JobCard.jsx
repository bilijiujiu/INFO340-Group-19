import { Link } from 'react-router';

function JobCard(props) {
  const job = props.job;

  return (
    <article className="card job-card">
      <div className="company-heading">
        <img className="company-logo" src={job.logo} alt="" aria-hidden="true" />
        <div>
          <h3>{job.company}</h3>
          <p className="job-role">{job.role}</p>
        </div>
      </div>

      <p>{job.location} · {job.salary} · {job.experience}</p>
      <p className="muted-text">{job.sponsorship}</p>

      <div className="job-actions">
        <Link className="button" to="/detail">View Details</Link>
        <button className="button secondary-button" type="button" onClick={props.onSave}>Save</button>
      </div>
    </article>
  );
}

export default JobCard;
