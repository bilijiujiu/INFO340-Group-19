import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import StatCard from '../components/StatCard';
import BarRow from '../components/BarRow';
import { analyticsData } from '../data/analytics';

function AnalyticsPage() {
  const [selectedType, setSelectedType] = useState('All job types');
  const [selectedCompany, setSelectedCompany] = useState('All companies');

  function handleTypeChange(event) {
    const newType = event.target.value;

    const matchingType = analyticsData.find(function(item) {
      return item.type === newType;
    });

    setSelectedType(newType);

    if (matchingType) {
      setSelectedCompany(matchingType.companies[0].name);
    }
  }

  function handleCompanyChange(event) {
    setSelectedCompany(event.target.value);
  }

  const selectedTypeData = analyticsData.find(function(item) {
    return item.type === selectedType;
  });

  const currentTypeData = selectedTypeData || analyticsData[0];

  const selectedCompanyData = currentTypeData.companies.find(function(company) {
    return company.name === selectedCompany;
  });

  const currentCompanyData = selectedCompanyData || currentTypeData.companies[0];

  const typeOptions = analyticsData.map(function(item) {
    return (
      <option key={item.id} value={item.type}>
        {item.type}
      </option>
    );
  });

  const companyOptions = currentTypeData.companies.map(function(company) {
    return (
      <option key={company.id} value={company.name}>
        {company.name}
      </option>
    );
  });

  const statCards = currentCompanyData.stats.map(function(stat) {
    return <StatCard key={stat.id} value={stat.value} label={stat.label} />;
  });

  const statusBars = currentCompanyData.statusRows.map(function(row) {
    return (
      <BarRow
        key={row.id}
        label={row.label + ' (' + row.count + ')'}
        percent={row.percent}
      />
    );
  });

  const educationBars = currentCompanyData.educationRows.map(function(row) {
    return <BarRow key={row.id} label={row.label} percent={row.percent} />;
  });

  const locationBars = currentCompanyData.locationRows.map(function(row) {
    return <BarRow key={row.id} label={row.label} percent={row.percent} />;
  });

  const visaBars = currentCompanyData.visaRows.map(function(row) {
    return (
      <BarRow
        key={row.id}
        label={row.label + ' (' + row.count + ')'}
        percent={row.percent}
      />
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>Analytics &amp; Insight</h1>
          <p className="muted-text">
            Review job search patterns based on the selected job type and company.
          </p>
        </div>
        <Link className="button" to="/jobs">Search More Jobs</Link>
      </div>

      <section className="card">
        <div>
          <h2>Analytics Filters</h2>
          <p className="muted-text">
            Choose a job type and company to update the analytics data shown below.
          </p>
        </div>

        <form className="form-stack">
          <div className="form-row">
            <label htmlFor="preferred-type">Preferred Job Type</label>
            <select
              id="preferred-type"
              name="preferred-type"
              value={selectedType}
              onChange={handleTypeChange}
            >
              {typeOptions}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="preferred-company">Company</label>
            <select
              id="preferred-company"
              name="preferred-company"
              value={selectedCompany}
              onChange={handleCompanyChange}
            >
              {companyOptions}
            </select>
          </div>
        </form>
      </section>

      <section className="stats-grid">
        {statCards}
      </section>

      <section className="analytics-grid">
        <article className="card">
          <h2>Application Status Distribution</h2>
          <div className="bar-list">
            {statusBars}
          </div>
          <p className="muted-text">
            This chart summarizes how many saved jobs are in each application stage.
          </p>
        </article>

        <article className="card">
          <h2>Education Level</h2>
          <div className="bar-list">
            {educationBars}
          </div>
        </article>

        <article className="card">
          <h2>Top Locations</h2>
          <div className="bar-list">
            {locationBars}
          </div>
        </article>

        <article className="card">
          <h2>Visa Sponsorship</h2>
          <div className="bar-list">
            {visaBars}
          </div>
          <p className="muted-text">
            This chart helps users quickly see which jobs may support visa sponsorship.
          </p>
        </article>
      </section>
    </PageLayout>
  );
}

export default AnalyticsPage;