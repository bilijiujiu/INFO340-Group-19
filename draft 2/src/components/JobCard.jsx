function JobInfoItem(props) {
  return (
    <div className="job-info-item">
      <dt className="job-info-label">{props.label}</dt>
      <dd className="job-info-value">{props.value}</dd>
    </div>
  );
}

function JobCard(props) {
  const job = props.job;
  const logoSrc = job.logo || '/img/logos/generic.svg';
  const salaryText = job.salary || job.salaryRange || 'Not listed';
  const deadlineText = job.deadline || 'No deadline listed';
  const sourceText = job.source || 'Job board';

  function handleSaveClick() {
    props.onSaveJob(job);
  }

  return (
    <article className="card job-card">
      <header className="job-card-header">
        <div className="company-heading">
          <img
            className="company-logo"
            src={logoSrc}
            alt={`${job.company} logo`}
          />

          <div>
            <p className="company-name">{job.company}</p>
            <h3 className="job-title">{job.role}</h3>
          </div>
        </div>

        <p className="sponsorship-badge">{job.sponsorship}</p>
      </header>

      <p className="job-description">{job.description}</p>

      <dl className="job-info-grid">
        <JobInfoItem label="Location" value={job.location} />
        <JobInfoItem label="Salary" value={salaryText} />
        <JobInfoItem label="Level" value={job.experience} />
        <JobInfoItem label="Deadline" value={deadlineText} />
        <JobInfoItem label="Source" value={sourceText} />
      </dl>

      <div className="job-card-footer">
        <button
          className="button"
          type="button"
          onClick={handleSaveClick}
          disabled={props.isSaving}
        >
          {props.isSaving ? 'Saving...' : 'Save to Applications'}
        </button>
      </div>
    </article>
  );
}

export default JobCard;