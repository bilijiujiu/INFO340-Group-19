import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';

function SettingsPage(props) {
  const [displayName, setDisplayName] = useState('Pengyu');
  const [school, setSchool] = useState('University of Washington');
  const [profileMessage, setProfileMessage] = useState('');

  const [targetRole, setTargetRole] = useState('Software Engineer Intern');
  const [targetLocation, setTargetLocation] = useState('Seattle');
  const [preferenceMessage, setPreferenceMessage] = useState('');

  const [reminderFrequency, setReminderFrequency] = useState('Daily');
  const [notificationMessage, setNotificationMessage] = useState('');

  function handleDisplayNameChange(event) {
    setDisplayName(event.target.value);
  }

  function handleSchoolChange(event) {
    setSchool(event.target.value);
  }

  function handleTargetRoleChange(event) {
    setTargetRole(event.target.value);
  }

  function handleTargetLocationChange(event) {
    setTargetLocation(event.target.value);
  }

  function handleReminderFrequencyChange(event) {
    setReminderFrequency(event.target.value);
  }

  function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileMessage('Profile saved for ' + displayName + '.');
  }

  function handlePreferenceSubmit(event) {
    event.preventDefault();
    setPreferenceMessage('Preferences saved: ' + targetRole + ' in ' + targetLocation + '.');
  }

  function handleNotificationSubmit(event) {
    event.preventDefault();
    setNotificationMessage('Notifications saved: ' + reminderFrequency + '.');
  }

  const jobs = props.jobs || [];

  const appliedJobs = jobs.filter(function(job) {
    return job.status === 'Applied';
  });

  const interviewJobs = jobs.filter(function(job) {
    return job.status === 'Interview';
  });

  const offerJobs = jobs.filter(function(job) {
    return job.status === 'Offer';
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Settings</h1>
          <p className="muted-text">User preferences for notifications, profile details, and job search goals.</p>
        </div>
        <Link className="button" to="/dashboard">Back to Dashboard</Link>
      </div>

      <section className="settings-grid">
        <article className="card">
          <h2>Profile</h2>
          <form className="form-stack" onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <label htmlFor="display-name">Display Name</label>
              <input
                id="display-name"
                name="display-name"
                type="text"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="school">School</label>
              <input
                id="school"
                name="school"
                type="text"
                value={school}
                onChange={handleSchoolChange}
              />
            </div>
            <button className="button" type="submit">Save Profile</button>
          </form>
          {profileMessage !== '' && <p className="data-note">{profileMessage}</p>}
        </article>

        <article className="card">
          <h2>Job Preferences</h2>
          <form className="form-stack" onSubmit={handlePreferenceSubmit}>
            <div className="form-row">
              <label htmlFor="target-role">Target Role</label>
              <input
                id="target-role"
                name="target-role"
                type="text"
                value={targetRole}
                onChange={handleTargetRoleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="target-location">Target Location</label>
              <select
                id="target-location"
                name="target-location"
                value={targetLocation}
                onChange={handleTargetLocationChange}
              >
                <option>Seattle</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>Remote</option>
              </select>
            </div>
            <button className="button" type="submit">Save Preferences</button>
          </form>
          {preferenceMessage !== '' && <p className="data-note">{preferenceMessage}</p>}
        </article>

        <article className="card">
          <h2>Notifications</h2>
          <form className="form-stack" onSubmit={handleNotificationSubmit}>
            <div className="form-row">
              <label htmlFor="reminder-frequency">Reminder Frequency</label>
              <select
                id="reminder-frequency"
                name="reminder-frequency"
                value={reminderFrequency}
                onChange={handleReminderFrequencyChange}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Only before deadlines</option>
              </select>
            </div>
            <button className="button" type="submit">Save Notifications</button>
          </form>
          {notificationMessage !== '' && <p className="data-note">{notificationMessage}</p>}
        </article>

        <article className="card">
          <h2>Data Summary</h2>
          <p>You currently track {jobs.length} saved jobs, {appliedJobs.length} applications, {interviewJobs.length} interviews, and {offerJobs.length} offers.</p>
          <Link className="button secondary-button" to="/analytics">View Analytics</Link>
        </article>
      </section>
    </PageLayout>
  );
}

export default SettingsPage;