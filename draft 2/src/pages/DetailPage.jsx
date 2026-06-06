import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';

function DetailPage(props) {
  const [notes, setNotes] = useState('');
  const [savedNote, setSavedNote] = useState('');

  const job = props.jobs[0];

  const tasks = ['Send thank-you email', 'Coding challenge', 'Mock interview prep'];
  const statuses = ['Saved', 'Applied', 'Interview', 'Offer'];

  const statusItems = statuses.map(function(status) {
    return <li key={status}>{status}</li>;
  });

  const taskItems = tasks.map(function(task) {
    return <li key={task}>{task}</li>;
  });

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedNote(notes);
  }

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Job Detail &amp; Workspace</h1>
          <p className="muted-text">One reusable example detail page for a selected job card.</p>
        </div>
        <Link className="button" to="/applications">Back to Applications</Link>
      </div>

      <div className="detail-layout">
        <section className="card">
          <div className="company-heading">
            <img className="company-logo" src={job.logo} alt="" aria-hidden="true" />
            <div>
              <h2>{job.company}</h2>
              <p className="job-role">{job.role}</p>
            </div>
          </div>

          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Deadline:</strong> {job.deadline}</p>
          <p><strong>Source:</strong> {job.source}</p>

          <img className="info-image decorative-image" src="/img/workspace.svg" alt="" aria-hidden="true" />

          <p className="muted-text">{job.description}</p>

          <Link className="button secondary-button" to="/jobs">View on Job Board</Link>
        </section>

        <section className="card">
          <h2>Workspace</h2>

          <h3>Status</h3>
          <ul className="status-list">
            {statusItems}
          </ul>

          <form className="form-stack" onSubmit={handleSubmit}>
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

            <button className="button" type="submit">Save Note</button>
          </form>

          {savedNote !== '' && (
            <div className="data-note">
              <p><strong>Saved note:</strong> {savedNote}</p>
            </div>
          )}

          <h3>Tasks</h3>
          <ul className="task-list">
            {taskItems}
          </ul>

          <Link className="button secondary-button" to="/add-job">+ Add Task</Link>
        </section>
      </div>
    </PageLayout>
  );
}

export default DetailPage;