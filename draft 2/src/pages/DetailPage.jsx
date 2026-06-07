import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import PageLayout from '../components/PageLayout';

function StatusButton(props) {
  function handleClick() {
    props.onChangeStatus(props.status);
  }

  let buttonClass = 'button secondary-button';

  if (props.currentStatus === props.status) {
    buttonClass = 'button';
  }

  return (
    <li>
      <button className={buttonClass} type="button" onClick={handleClick} disabled={props.isSaving}>
        {props.status}
      </button>
    </li>
  );
}

function DetailPage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [noteMessage, setNoteMessage] = useState('');
  const [noteError, setNoteError] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const jobId = params.jobId;

  const selectedJob = props.jobs.find(function(job) {
    const detailId = job.key || job.id;
    return String(detailId) === String(jobId) || String(job.id) === String(jobId);
  });

  let job = selectedJob;

  if (!jobId && props.jobs.length > 0) {
    job = props.jobs[0];
  }

  useEffect(function() {
    if (job) {
      setNotes(job.notes || '');
    }
  }, [jobId, job]);

  function getJobKey() {
    return job.key || job.id;
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleStatusChange(newStatus) {
    const jobKey = getJobKey();

    setIsSavingStatus(true);
    setStatusMessage('');
    setStatusError('');

    props.onUpdateJobField(jobKey, 'status', newStatus)
      .then(function() {
        setStatusMessage('Status updated to ' + newStatus + '.');
        setIsSavingStatus(false);
      })
      .catch(function(error) {
        setStatusError('The status could not be updated: ' + error.message);
        setIsSavingStatus(false);
      });
  }

  function handleNoteSubmit(event) {
    event.preventDefault();

    const jobKey = getJobKey();

    setIsSavingNote(true);
    setNoteMessage('');
    setNoteError('');

    props.onUpdateJobField(jobKey, 'notes', notes)
      .then(function() {
        setNoteMessage('Note saved to Firebase.');
        setIsSavingNote(false);
      })
      .catch(function(error) {
        setNoteError('The note could not be saved: ' + error.message);
        setIsSavingNote(false);
      });
  }

  function handleDelete() {
    const jobKey = getJobKey();

    setIsDeleting(true);
    setDeleteError('');

    props.onDeleteJob(jobKey)
      .then(function() {
        navigate('/applications');
      })
      .catch(function(error) {
        setDeleteError('The job could not be deleted: ' + error.message);
        setIsDeleting(false);
      });
  }

  if (!job) {
    return (
      <PageLayout>
        <section className="card">
          <h1>Job Not Found</h1>
          <p>This job may have been deleted, or the link may not match a saved job.</p>
          <Link className="button" to="/applications">Back to Applications</Link>
        </section>
      </PageLayout>
    );
  }

  const logoSrc = job.logo || '/img/logos/generic.svg';
  const statuses = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

  const statusItems = statuses.map(function(status) {
    return (
      <StatusButton
        key={status}
        status={status}
        currentStatus={job.status}
        isSaving={isSavingStatus}
        onChangeStatus={handleStatusChange}
      />
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Job Detail &amp; Workspace</h1>
          <p className="muted-text">Review and update one selected job application.</p>
        </div>
        <Link className="button" to="/applications">Back to Applications</Link>
      </div>

      <div className="detail-layout">
        <section className="card">
          <div className="company-heading">
            <img className="company-logo" src={logoSrc} alt="" aria-hidden="true" />
            <div>
              <h2>{job.company}</h2>
              <p className="job-role">{job.role}</p>
            </div>
          </div>

          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Deadline:</strong> {job.deadline}</p>
          <p><strong>Source:</strong> {job.source}</p>
          <p><strong>Visa:</strong> {job.sponsorship}</p>

          <p className="muted-text">{job.description}</p>

          <div className="job-actions">
            <Link className="button secondary-button" to="/jobs">View on Job Board</Link>
            <button className="button secondary-button" type="button" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete Job'}
            </button>
          </div>

          {deleteError !== '' && <p className="data-note">{deleteError}</p>}
        </section>

        <section className="card">
          <h2>Workspace</h2>

          <h3>Status</h3>
          <p className="muted-text">Click a status to move this application to a different column.</p>
          <ul className="status-list">
            {statusItems}
          </ul>
          {statusMessage !== '' && <p className="data-note">{statusMessage}</p>}
          {statusError !== '' && <p className="data-note">{statusError}</p>}

          <form className="form-stack" onSubmit={handleNoteSubmit}>
            <div className="form-row">
              <label htmlFor="job-notes">Notes</label>
              <textarea
                id="job-notes"
                name="job-notes"
                placeholder="Write your notes here..."
                value={notes}
                onChange={handleNotesChange}
              ></textarea>
            </div>

            <button className="button" type="submit" disabled={isSavingNote}>
              {isSavingNote ? 'Saving...' : 'Save Note'}
            </button>
          </form>

          {noteMessage !== '' && <p className="data-note">{noteMessage}</p>}
          {noteError !== '' && <p className="data-note">{noteError}</p>}
        </section>
      </div>
    </PageLayout>
  );
}

export default DetailPage;