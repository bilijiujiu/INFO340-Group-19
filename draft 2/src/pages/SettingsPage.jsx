import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';

function SettingsPage() {
  const [displayName, setDisplayName] = useState('Pengyu');
  const [school, setSchool] = useState('University of Washington');
  const [profileMessage, setProfileMessage] = useState('');

  function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileMessage('Profile saved for ' + displayName + '.');
  }

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
              <input id="display-name" name="display-name" type="text" value={displayName} onChange={function(event) { setDisplayName(event.target.value); }} />
            </div>
            <div className="form-row">
              <label htmlFor="school">School</label>
              <input id="school" name="school" type="text" value={school} onChange={function(event) { setSchool(event.target.value); }} />
            </div>
            <button className="button" type="submit">Save Profile</button>
          </form>
          {profileMessage !== '' && <p className="data-note">{profileMessage}</p>}
        </article>

        <article className="card">
          <h2>Job Preferences</h2>
          <form className="form-stack">
            <div className="form-row">
              <label htmlFor="target-role">Target Role</label>
              <input id="target-role" name="target-role" type="text" placeholder="Software Engineer Intern" />
            </div>
            <div className="form-row">
              <label htmlFor="target-location">Target Location</label>
              <select id="target-location" name="target-location">
                <option>Seattle</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>Remote</option>
              </select>
            </div>
            <button className="button" type="button">Save Preferences</button>
          </form>
        </article>

        <article className="card">
          <h2>Notifications</h2>
          <form className="form-stack">
            <div className="form-row">
              <label htmlFor="reminder-frequency">Reminder Frequency</label>
              <select id="reminder-frequency" name="reminder-frequency">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Only before deadlines</option>
              </select>
            </div>
            <button className="button" type="button">Save Notifications</button>
          </form>
        </article>

        <article className="card">
          <h2>Data Summary</h2>
          <p>You currently track 48 saved jobs, 23 applications, 7 interviews, and 2 offers.</p>
          <Link className="button secondary-button" to="/analytics">View Analytics</Link>
        </article>
      </section>
    </PageLayout>
  );
}

export default SettingsPage;
