import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import JobCard from '../components/JobCard';

const LOCATION_OPTIONS = [
  'Seattle',
  'Redmond',
  'San Francisco',
  'Remote',
  'New York',
  'Los Angeles',
  'Sunnyvale',
  'Austin',
  'Chicago',
  'San Jose',
  'Mountain View',
  'Cupertino',
  'Menlo Park'
];

const EXPERIENCE_OPTIONS = ['Internship', 'Entry level', 'Mid level'];
const SPONSORSHIP_OPTIONS = ['Any', 'Sponsors visa', 'No sponsorship'];

function LocationChip(props) {
  let chipClass = 'chip';

  if (props.currentLocation === props.location) {
    chipClass = 'chip active-chip';
  }

  function handleClick() {
    props.onSelectLocation(props.location);
  }

  return (
    <button
      type="button"
      className={chipClass}
      onClick={handleClick}
    >
      {props.location}
    </button>
  );
}

function ExperienceChip(props) {
  let chipClass = 'chip';

  if (props.currentExperience === props.experience) {
    chipClass = 'chip active-chip';
  }

  function handleClick() {
    props.onSelectExperience(props.experience);
  }

  return (
    <button
      type="button"
      className={chipClass}
      onClick={handleClick}
    >
      {props.experience}
    </button>
  );
}

function LocationOption(props) {
  return (
    <option value={props.location}>{props.location}</option>
  );
}

function SponsorshipOption(props) {
  return (
    <label className="sidebar-radio-label">
      <input
        type="radio"
        name="sponsorship"
        value={props.option}
        checked={props.currentSponsorship === props.option}
        onChange={props.onChange}
      />
      {props.option}
    </label>
  );
}

function JobsPage(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('Any location');
  const [salaryFilter, setSalaryFilter] = useState('Any salary');
  const [experienceFilter, setExperienceFilter] = useState('Any level');
  const [sponsorshipFilter, setSponsorshipFilter] = useState('Any');
  const [sortBy, setSortBy] = useState('Newest');
  const [savedMessage, setSavedMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  const [savingJobId, setSavingJobId] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleLocationSelect(location) {
    if (locationFilter === location) {
      setLocationFilter('Any location');
    } else {
      setLocationFilter(location);
    }
  }

  function handleMoreCityChange(event) {
    if (event.target.value === '') {
      setLocationFilter('Any location');
    } else {
      setLocationFilter(event.target.value);
    }
  }

  function handleExperienceSelect(experience) {
    if (experienceFilter === experience) {
      setExperienceFilter('Any level');
    } else {
      setExperienceFilter(experience);
    }
  }

  function handleSalaryChange(event) {
    setSalaryFilter(event.target.value);
  }

  function handleSponsorshipChange(event) {
    setSponsorshipFilter(event.target.value);
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  function handleReset() {
    setSearchTerm('');
    setLocationFilter('Any location');
    setSalaryFilter('Any salary');
    setExperienceFilter('Any level');
    setSponsorshipFilter('Any');
    setSortBy('Newest');
    setSavedMessage('');
    setSaveError('');
  }

  function applicationMatchesListing(application, listing) {
    return application.sourceJobId === listing.id;
  }

  function jobIsSaved(job) {
    return props.applications.some(function(application) {
      return applicationMatchesListing(application, job);
    });
  }

  function jobMatches(job) {
    const lowerSearch = searchTerm.toLowerCase();
    const titleCompanyText = (job.company + ' ' + job.role).toLowerCase();

    const matchesSearch = titleCompanyText.includes(lowerSearch);
    const matchesLocation = locationFilter === 'Any location' || job.location === locationFilter;
    const matchesSalary = salaryFilter === 'Any salary' || job.salaryRange === salaryFilter;
    const matchesExperience = experienceFilter === 'Any level' || job.experience === experienceFilter;
    const matchesSponsorship = sponsorshipFilter === 'Any' || job.sponsorship === sponsorshipFilter;
    const isNotSaved = !jobIsSaved(job);

    return matchesSearch && matchesLocation && matchesSalary && matchesExperience && matchesSponsorship && isNotSaved;
  }

  function handleSave(job) {
    const savedJob = {
      ...job,
      sourceJobId: job.id,
      status: 'Saved',
      date: 'Today',
      notes: ''
    };

    setSavedMessage('');
    setSaveError('');
    setSavingJobId(job.id);

    props.onSaveJob(savedJob)
      .then(function() {
        setSavedMessage(job.company + ' — ' + job.role + ' was saved to your applications.');
        setSavingJobId('');
      })
      .catch(function(error) {
        setSaveError('The job could not be saved: ' + error.message);
        setSavingJobId('');
      });
  }

  let filteredJobs = props.jobs.filter(jobMatches);

  if (sortBy === 'Company') {
    filteredJobs = filteredJobs.sort(function(a, b) {
      return a.company.localeCompare(b.company);
    });
  }

  if (sortBy === 'Role') {
    filteredJobs = filteredJobs.sort(function(a, b) {
      return a.role.localeCompare(b.role);
    });
  }

  const hasActiveFilters =
    locationFilter !== 'Any location' ||
    salaryFilter !== 'Any salary' ||
    experienceFilter !== 'Any level' ||
    sponsorshipFilter !== 'Any';

  const primaryLocations = LOCATION_OPTIONS.slice(0, 5);
  const otherLocations = LOCATION_OPTIONS.slice(5);
  const moreCityValue = otherLocations.includes(locationFilter) ? locationFilter : '';

  const locationChips = primaryLocations.map(function(location) {
    return (
      <LocationChip
        key={location}
        location={location}
        currentLocation={locationFilter}
        onSelectLocation={handleLocationSelect}
      />
    );
  });

  const moreCityOptions = otherLocations.map(function(location) {
    return (
      <LocationOption key={location} location={location} />
    );
  });

  const experienceChips = EXPERIENCE_OPTIONS.map(function(experience) {
    return (
      <ExperienceChip
        key={experience}
        experience={experience}
        currentExperience={experienceFilter}
        onSelectExperience={handleExperienceSelect}
      />
    );
  });

  const sponsorshipOptions = SPONSORSHIP_OPTIONS.map(function(option) {
    return (
      <SponsorshipOption
        key={option}
        option={option}
        currentSponsorship={sponsorshipFilter}
        onChange={handleSponsorshipChange}
      />
    );
  });

  const jobCards = filteredJobs.map(function(job) {
    return (
      <JobCard
        key={job.id}
        job={job}
        isSaving={savingJobId === job.id}
        onSaveJob={handleSave}
      />
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Find jobs</h1>
          <p className="muted-text">Search, filter, and save jobs you want to track.</p>
        </div>
        <Link className="button secondary-button" to="/applications">
          View Applications
        </Link>
      </div>

      <section className="card search-card compact-search-card">
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

          <div>
            <p className="filter-chip-label">Location</p>
            <div className="quick-filter-row">
              {locationChips}

              <select
                className="chip-select"
                value={moreCityValue}
                onChange={handleMoreCityChange}
              >
                <option value="">More cities…</option>
                {moreCityOptions}
              </select>
            </div>
          </div>

          <div>
            <p className="filter-chip-label">Experience</p>
            <div className="quick-filter-row">
              {experienceChips}
            </div>
          </div>
        </form>
      </section>

      {savedMessage !== '' && <p className="data-note">{savedMessage}</p>}
      {saveError !== '' && <p className="data-note">{saveError}</p>}

      <div className="jobs-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">Filters</span>
            {hasActiveFilters && (
              <button className="reset-link" type="button" onClick={handleReset}>
                Reset all
              </button>
            )}
          </div>

          <div className="sidebar-section">
            <p className="sidebar-section-label">Salary</p>
            <div className="form-row">
              <select
                id="salary"
                value={salaryFilter}
                onChange={handleSalaryChange}
              >
                <option>Any salary</option>
                <option>$60k - $100k</option>
                <option>$100k - $140k</option>
                <option>$140k+</option>
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-section-label">Sponsorship</p>
            <div className="sidebar-radio-group">
              {sponsorshipOptions}
            </div>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-section-label">Sort by</p>
            <div className="form-row">
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option>Newest</option>
                <option>Company</option>
                <option>Role</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="jobs-results">
          <p className="muted-text results-count">
            <strong>{filteredJobs.length}</strong> open jobs found
          </p>

          <section className="job-grid">
            {jobCards}
          </section>

          {filteredJobs.length === 0 && (
            <section className="card empty-state">
              <h2>No open jobs match these filters</h2>
              <p>Try changing the search term, selecting a broader filter, or checking your applications page.</p>
            </section>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default JobsPage;