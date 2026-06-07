import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import JobCard from '../components/JobCard';

function JobsPage(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('Any location');
  const [salaryFilter, setSalaryFilter] = useState('Any salary');
  const [experienceFilter, setExperienceFilter] = useState('Any level');
  const [sponsorshipFilter, setSponsorshipFilter] = useState('Any');
  const [savedMessage, setSavedMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleLocationChange(event) {
    setLocationFilter(event.target.value);
  }

  function handleSalaryChange(event) {
    setSalaryFilter(event.target.value);
  }

  function handleExperienceChange(event) {
    setExperienceFilter(event.target.value);
  }

  function handleSponsorshipChange(event) {
    setSponsorshipFilter(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleReset() {
    setSearchTerm('');
    setLocationFilter('Any location');
    setSalaryFilter('Any salary');
    setExperienceFilter('Any level');
    setSponsorshipFilter('Any');
    setSavedMessage('');
    setDeleteMessage('');
    setDeleteError('');
  }

  function jobMatches(job) {
    const lowerSearch = searchTerm.toLowerCase();
    const titleCompanyText = (job.company + ' ' + job.role).toLowerCase();

    const matchesSearch = titleCompanyText.includes(lowerSearch);
    const matchesLocation = locationFilter === 'Any location' || job.location === locationFilter;
    const matchesSalary = salaryFilter === 'Any salary' || job.salaryRange === salaryFilter;
    const matchesExperience = experienceFilter === 'Any level' || job.experience === experienceFilter;
    const matchesSponsorship = sponsorshipFilter === 'Any' || job.sponsorship === sponsorshipFilter;

    return matchesSearch && matchesLocation && matchesSalary && matchesExperience && matchesSponsorship;
  }

  function handleSave(job) {
    setSavedMessage(job.company + ' — ' + job.role + ' was saved to your tracker.');
    setDeleteMessage('');
    setDeleteError('');
  }

  function handleDelete(job) {
    const jobKey = job.key || job.id;

    setSavedMessage('');
    setDeleteMessage('');
    setDeleteError('');

    props.onDeleteJob(jobKey)
      .then(function() {
        setDeleteMessage(job.company + ' — ' + job.role + ' was deleted.');
      })
      .catch(function(error) {
        setDeleteError('The job could not be deleted: ' + error.message);
      });
  }

  const filteredJobs = props.jobs.filter(jobMatches);

  const jobCards = filteredJobs.map(function(job) {
    return (
      <JobCard
        key={job.key || job.id}
        job={job}
        onSave={function() {
          handleSave(job);
        }}
        onDelete={function() {
          handleDelete(job);
        }}
      />
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Job Search &amp; Filter</h1>
          <p className="muted-text">Search job listings and filter by your preferences.</p>
        </div>
        <Link className="button" to="/add-job">+ Add Job</Link>
      </div>

      <section className="card search-card">
        <div>
          <h2>Search Jobs</h2>
          <p className="muted-text">Use filters to narrow down the job listings.</p>
        </div>

        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="search-row">
            <div className="form-row">
              <label htmlFor="job-search">Search by title or company</label>
              <input
                id="job-search"
                name="job-search"
                type="search"
                placeholder="Search job title, company..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button className="button" type="submit">Search</button>
          </div>

          <div className="settings-grid">
            <div className="form-row">
              <label htmlFor="location">Location</label>
              <select id="location" name="location" value={locationFilter} onChange={handleLocationChange}>
                <option>Any location</option>
                <option>Seattle</option>
                <option>Redmond</option>
                <option>San Francisco</option>
                <option>Remote</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Sunnyvale</option>
                <option>Austin</option>
                <option>Chicago</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="salary">Salary Range</label>
              <select id="salary" name="salary" value={salaryFilter} onChange={handleSalaryChange}>
                <option>Any salary</option>
                <option>$60k - $100k</option>
                <option>$100k - $140k</option>
                <option>$140k+</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="experience">Experience Level</label>
              <select id="experience" name="experience" value={experienceFilter} onChange={handleExperienceChange}>
                <option>Any level</option>
                <option>Internship</option>
                <option>Entry level</option>
                <option>Mid level</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="sponsorship">Visa Sponsorship</label>
              <select id="sponsorship" name="sponsorship" value={sponsorshipFilter} onChange={handleSponsorshipChange}>
                <option>Any</option>
                <option>Sponsors visa</option>
                <option>No sponsorship</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="button secondary-button" type="button" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        </form>
      </section>

      {savedMessage !== '' && <p className="data-note">{savedMessage}</p>}
      {deleteMessage !== '' && <p className="data-note">{deleteMessage}</p>}
      {deleteError !== '' && <p className="data-note">{deleteError}</p>}

      <p className="muted-text">{filteredJobs.length} jobs found</p>

      <section className="job-grid">
        {jobCards}
      </section>

      {filteredJobs.length === 0 && (
        <section className="card empty-state">
          <img
            className="empty-state-img"
            src="/img/empty-search.svg"
            alt=""
            aria-hidden="true"
          />
          <h2>No jobs match these filters</h2>
          <p>Try changing the search term or selecting a broader filter.</p>
        </section>
      )}
    </PageLayout>
  );
}

export default JobsPage;
