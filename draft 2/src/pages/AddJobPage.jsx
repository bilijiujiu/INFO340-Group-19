import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';

function AddJobPage(props) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Saved');
  const [sponsorship, setSponsorship] = useState('Sponsors visa');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const newJob = {
      id: props.nextId,
      company: company,
      logo: '/img/logos/generic.svg',
      role: role,
      location: location,
      salary: 'Not listed',
      salaryRange: 'Any salary',
      experience: 'Entry level',
      sponsorship: sponsorship,
      status: status,
      date: 'Today',
      deadline: deadline,
      source: source,
      description: description
    };

    setIsSaving(true);
    setMessage('');
    setErrorMessage('');

    props.onAddJob(newJob)
      .then(function() {
        setMessage(company + ' — ' + role + ' was added to the tracker.');
        setCompany('');
        setRole('');
        setLocation('');
        setDeadline('');
        setStatus('Saved');
        setSponsorship('Sponsors visa');
        setSource('');
        setDescription('');
        setIsSaving(false);
      })
      .catch(function(error) {
        setErrorMessage('The job could not be saved: ' + error.message);
        setIsSaving(false);
      });
  }

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Add Job</h1>
          <p className="muted-text">A controlled form view for adding a new job to the tracker.</p>
        </div>
        <Link className="button" to="/jobs">Back to Job Board</Link>
      </div>

      <section className="card">
        <h2>Job Information</h2>
        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="settings-grid">
            <div className="form-row">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" placeholder="Company name" value={company} onChange={function(event) { setCompany(event.target.value); }} required />
            </div>
            <div className="form-row">
              <label htmlFor="role">Role</label>
              <input id="role" name="role" type="text" placeholder="Job title" value={role} onChange={function(event) { setRole(event.target.value); }} required />
            </div>
            <div className="form-row">
              <label htmlFor="job-location">Location</label>
              <input id="job-location" name="job-location" type="text" placeholder="City or remote" value={location} onChange={function(event) { setLocation(event.target.value); }} />
            </div>
            <div className="form-row">
              <label htmlFor="deadline">Deadline</label>
              <input id="deadline" name="deadline" type="date" value={deadline} onChange={function(event) { setDeadline(event.target.value); }} />
            </div>
            <div className="form-row">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={status} onChange={function(event) { setStatus(event.target.value); }}>
                <option>Saved</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="visa-sponsorship">Visa Sponsorship</label>
              <select id="visa-sponsorship" name="visa-sponsorship" value={sponsorship} onChange={function(event) { setSponsorship(event.target.value); }}>
                <option>Sponsors visa</option>
                <option>No sponsorship</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="source">Source</label>
              <input id="source" name="source" type="text" placeholder="LinkedIn, Handshake, referral..." value={source} onChange={function(event) { setSource(event.target.value); }} />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="description">Job Description or Notes</label>
            <textarea id="description" name="description" placeholder="Paste useful notes about the role..." value={description} onChange={function(event) { setDescription(event.target.value); }}></textarea>
          </div>
          <button className="button" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Job'}
          </button>
        </form>
      </section>

      {errorMessage !== '' && (
        <section className="card">
          <h2>Save Error</h2>
          <p>{errorMessage}</p>
        </section>
      )}

      {message !== '' && (
        <section className="card">
          <h2>Saved</h2>
          <p>{message}</p>
          <Link className="button secondary-button" to="/applications">View Applications</Link>
        </section>
      )}
    </PageLayout>
  );
}

export default AddJobPage;