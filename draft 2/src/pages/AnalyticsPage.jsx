import { useState } from 'react';
import { Link } from 'react-router';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import PageLayout from '../components/PageLayout';
import StatCard from '../components/StatCard';
import { analyticsData } from '../data/analytics';

function AnalyticsPage() {
  const [selectedType, setSelectedType] = useState('All job types');
  const [selectedCompany, setSelectedCompany] = useState('All companies');
  const [compareItems, setCompareItems] = useState([]);
  const [compareMessage, setCompareMessage] = useState('');

  function getStatValue(companyData, label) {
    const matchingStat = companyData.stats.find(function(stat) {
      return stat.label === label;
    });

    if (matchingStat) {
      return matchingStat.value;
    }

    return 'N/A';
  }

  function handleTypeChange(event) {
    const newType = event.target.value;

    const matchingType = analyticsData.find(function(item) {
      return item.type === newType;
    });

    setSelectedType(newType);
    setCompareMessage('');

    if (matchingType) {
      setSelectedCompany(matchingType.companies[0].name);
    }
  }

  function handleCompanyChange(event) {
    setSelectedCompany(event.target.value);
    setCompareMessage('');
  }

  const selectedTypeData = analyticsData.find(function(item) {
    return item.type === selectedType;
  });

  const currentTypeData = selectedTypeData || analyticsData[0];

  const selectedCompanyData = currentTypeData.companies.find(function(company) {
    return company.name === selectedCompany;
  });

  const currentCompanyData = selectedCompanyData || currentTypeData.companies[0];

  function handleAddCompare() {
    const newCompareItem = {
      key: selectedType + '-' + currentCompanyData.name,
      type: selectedType,
      company: currentCompanyData.name,
      totalApps: getStatValue(currentCompanyData, 'Total Apps'),
      interviewRate: getStatValue(currentCompanyData, 'Interview Rate'),
      offerRate: getStatValue(currentCompanyData, 'Offer Rate')
    };

    const alreadyAdded = compareItems.some(function(item) {
      return item.key === newCompareItem.key;
    });

    if (alreadyAdded) {
      setCompareMessage(newCompareItem.company + ' is already in your comparison list.');
    } else {
      setCompareItems(compareItems.concat(newCompareItem));
      setCompareMessage(newCompareItem.company + ' was added to your comparison list.');
    }
  }

  function handleRemoveCompare(event) {
    const itemKey = event.currentTarget.value;

    const updatedItems = compareItems.filter(function(item) {
      return item.key !== itemKey;
    });

    setCompareItems(updatedItems);
    setCompareMessage('Company removed from the comparison list.');
  }

  function handleClearCompare() {
    setCompareItems([]);
    setCompareMessage('Comparison list cleared.');
  }

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

  const statusChartData = currentCompanyData.statusRows.map(function(row) {
    return {
      label: row.label,
      count: row.count,
      percent: row.percent
    };
  });

  const visaChartData = currentCompanyData.visaRows.map(function(row) {
    return {
      label: row.label,
      count: row.count,
      percent: row.percent
    };
  });

  const educationChartData = currentCompanyData.educationRows.map(function(row) {
    return {
      label: row.label,
      percent: row.percent
    };
  });

  const locationChartData = currentCompanyData.locationRows.map(function(row) {
    return {
      label: row.label,
      percent: row.percent
    };
  });

  const chartColors = ['#165a72', '#2f7f89', '#5aa6a7', '#8cc7c7', '#c5e8e8'];

  const visaPieSlices = visaChartData.map(function(row, index) {
    const colorIndex = index % chartColors.length;

    return <Cell key={row.label} fill={chartColors[colorIndex]} />;
  });

  const compareRows = compareItems.map(function(item) {
    return (
      <tr key={item.key}>
        <td>{item.type}</td>
        <td>{item.company}</td>
        <td>{item.totalApps}</td>
        <td>{item.interviewRate}</td>
        <td>{item.offerRate}</td>
        <td>
          <button
            className="button secondary-button"
            type="button"
            value={item.key}
            onClick={handleRemoveCompare}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  const compareSection = compareItems.length > 0 ? (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Job Type</th>
            <th>Company</th>
            <th>Total Apps</th>
            <th>Interview Rate</th>
            <th>Offer Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {compareRows}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="muted-text">
      No companies are selected yet. Choose a job type and company, then add it to compare.
    </p>
  );

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

          <div className="filter-actions">
            <button className="button" type="button" onClick={handleAddCompare}>
              Add to Compare
            </button>
            <button className="button secondary-button" type="button" onClick={handleClearCompare}>
              Clear Compare List
            </button>
          </div>

          {compareMessage && <p className="data-note">{compareMessage}</p>}
        </form>
      </section>

      <section className="stats-grid">
        {statCards}
      </section>

      <section className="card">
        <h2>Company Comparison</h2>
        <p className="muted-text">
          Add companies to compare total applications, interview rate, and offer rate side by side.
        </p>
        {compareSection}
      </section>

      <section className="analytics-grid">
        <article className="card">
          <h2>Application Status Distribution</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Applications" fill="#165a72" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="muted-text">
            This chart summarizes how many saved jobs are in each application stage.
          </p>
        </article>

        <article className="card">
          <h2>Education Level</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={educationChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="label" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="percent" name="Percent" fill="#2f7f89" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="muted-text">
            This chart shows the education levels most commonly listed for the selected role and company.
          </p>
        </article>

        <article className="card">
          <h2>Top Locations</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationChartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="label" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="percent" name="Percent" fill="#5aa6a7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="muted-text">
            This chart shows where the selected company posts the most relevant opportunities.
          </p>
        </article>

        <article className="card">
          <h2>Visa Sponsorship</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visaChartData}
                  dataKey="count"
                  nameKey="label"
                  outerRadius={90}
                  label
                >
                  {visaPieSlices}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="muted-text">
            This pie chart helps users quickly see which jobs may support visa sponsorship.
          </p>
        </article>
      </section>
    </PageLayout>
  );
}

export default AnalyticsPage;
