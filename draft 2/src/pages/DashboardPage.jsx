import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import { quickInsights } from '../data/stats';

function getStatusBadgeClass(status) {
  const map = {
    'Saved': 'badge badge-saved',
    'Applied': 'badge badge-applied',
    'Interview': 'badge badge-interview',
    'Offer': 'badge badge-offer',
    'Rejected': 'badge badge-rejected',
  };
  return map[status] || 'badge badge-saved';
}

function getActionItems(applications) {
  const items = [];

  applications.forEach(function(app) {
    if (app.status === 'Interview') {
      items.push({
        id: 'followup-' + app.id,
        color: '#854F0B',
        text: 'Follow up with ' + app.company,
        sub: app.role + ' · interview scheduled — no response yet',
        priority: 1,
      });
    }
    if (app.status === 'Offer') {
      items.push({
        id: 'offer-' + app.id,
        color: '#3B6D11',
        text: 'Respond to ' + app.company + ' offer',
        sub: app.role + ' · review and reply to offer',
        priority: 0,
      });
    }
    if (app.status === 'Applied') {
      items.push({
        id: 'applied-' + app.id,
        color: '#185FA5',
        text: 'Check status at ' + app.company,
        sub: app.role + ' · applied ' + app.date,
        priority: 2,
      });
    }
  });

  items.sort(function(a, b) { return a.priority - b.priority; });
  return items.slice(0, 4);
}

function getPipelineSegments(applications) {
  const counts = { Saved: 0, Applied: 0, Interview: 0, Offer: 0 };
  applications.forEach(function(app) {
    if (counts[app.status] !== undefined) counts[app.status]++;
  });
  const total = applications.length || 1;
  return [
    { label: 'Saved',     count: counts.Saved,     color: '#165a72', bg: '#dff3f4' },
    { label: 'Applied',   count: counts.Applied,   color: '#185FA5', bg: '#b5d4f4' },
    { label: 'Interview', count: counts.Interview, color: '#854F0B', bg: '#fac775' },
    { label: 'Offer',     count: counts.Offer,     color: '#3B6D11', bg: '#c0dd97' },
  ].map(function(seg) {
    return { ...seg, pct: (seg.count / total) * 100 };
  });
}

function IconBookmark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="8 6 2 6 2 12 8 18"/><polyline points="16 6 22 6 22 12 16 18"/><path d="M12 18v4"/><path d="M8 22h8"/><path d="M8 6h8l-1 10H9L8 6z"/>
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9badba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><line x1="2" y1="13" x2="22" y2="13"/>
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9badba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function DashboardPage(props) {
  const firstName = props.user && props.user.displayName
    ? props.user.displayName.split(' ')[0]
    : '';

  const applications = props.jobs || [];
  const recentApps = applications.slice(0, 4);
  const actionItems = getActionItems(applications);
  const pipeline = getPipelineSegments(applications);

  const savedCount     = applications.length;
  const appliedCount   = applications.filter(function(j) { return j.status === 'Applied'; }).length;
  const interviewCount = applications.filter(function(j) { return j.status === 'Interview'; }).length;
  const offerCount     = applications.filter(function(j) { return j.status === 'Offer'; }).length;

  const pendingCount = actionItems.length;
  const subText = pendingCount > 0
    ? 'You have ' + pendingCount + ' item' + (pendingCount !== 1 ? 's' : '') + ' that need attention this week.'
    : 'Everything looks up to date. Keep applying!';

  const isEmpty = applications.length === 0;

  return (
    <PageLayout>

      <div className="page-heading">
        <div>
          <h1>Welcome back{firstName ? ', ' + firstName : ''}!</h1>
          <p className="muted-text">{subText}</p>
        </div>
        <Link className="button" to="/add-job">+ Add Job</Link>
      </div>

      <section className="dash-stat-row">
        <div className="dash-metric">
          <div className="dash-metric-icon dash-icon-teal"><IconBookmark /></div>
          <p className="dash-metric-val">{savedCount}</p>
          <p className="dash-metric-lbl">Saved</p>
        </div>
        <div className="dash-metric">
          <div className="dash-metric-icon dash-icon-blue"><IconSend /></div>
          <p className="dash-metric-val">{appliedCount}</p>
          <p className="dash-metric-lbl">Applied</p>
        </div>
        <div className="dash-metric">
          <div className="dash-metric-icon dash-icon-amber"><IconCalendar /></div>
          <p className="dash-metric-val">{interviewCount}</p>
          <p className="dash-metric-lbl">Interviews</p>
        </div>
        <div className="dash-metric">
          <div className="dash-metric-icon dash-icon-green"><IconTrophy /></div>
          <p className="dash-metric-val">{offerCount}</p>
          <p className="dash-metric-lbl">Offers</p>
        </div>
      </section>

      <section className="card dash-pipeline-card">
        <div className="dash-section-header">
          <h2>Application pipeline</h2>
          <span className="muted-text dash-section-count">{applications.length} total</span>
        </div>
        {isEmpty ? (
          <p className="dash-empty-hint">Save your first job to see your pipeline here.</p>
        ) : (
          <>
            <div className="dash-pipeline-bar">
              {pipeline.map(function(seg) {
                return seg.count > 0 ? (
                  <div
                    key={seg.label}
                    className="dash-pipeline-seg"
                    style={{ width: seg.pct + '%', backgroundColor: seg.bg }}
                    title={seg.label + ': ' + seg.count}
                  />
                ) : null;
              })}
            </div>
            <div className="dash-pipeline-legend">
              {pipeline.map(function(seg) {
                return (
                  <div key={seg.label} className="dash-legend-item">
                    <div className="dash-legend-dot" style={{ backgroundColor: seg.color }} />
                    {seg.label} ({seg.count})
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>


      <div className="dash-two-col">
        <section className="card">
          <div className="dash-section-header">
            <h2>Recent applications</h2>
            <Link className="button secondary-button dash-view-all-btn" to="/applications">
              View all
            </Link>
          </div>

          {isEmpty ? (
            <div className="dash-empty-state">
              <IconBriefcase />
              <p style={{ marginTop: '0.75rem' }}>No applications yet.<br />Start by saving jobs you&apos;re interested in.</p>
              <Link className="button" to="/jobs">Browse jobs</Link>
            </div>
          ) : (
            <div className="dash-app-list">
              {recentApps.map(function(app) {
                return (
                  <div key={app.id} className="dash-app-row">
                    <div className="dash-app-logo" aria-hidden="true">
                      {app.company ? app.company.charAt(0) : '?'}
                    </div>
                    <div className="dash-app-info">
                      <div className="dash-app-company">{app.company}</div>
                      <div className="dash-app-role">{app.role}</div>
                    </div>
                    <span className={getStatusBadgeClass(app.status)}>{app.status}</span>
                    <span className="dash-app-date">{app.date}</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="card">
          <div className="dash-section-header">
            <h2>Action items</h2>
            {pendingCount > 0 && (
              <span className="dash-pending-badge">{pendingCount} pending</span>
            )}
          </div>

          {actionItems.length === 0 ? (
            <div className="dash-empty-state">
              <IconCheckCircle />
              <p style={{ marginTop: '0.75rem' }}>No action items right now.<br />You&apos;re all caught up!</p>
              <Link className="button" to="/jobs">Find more jobs</Link>
            </div>
          ) : (
            <div className="dash-todo-list">
              {actionItems.map(function(item) {
                return (
                  <div key={item.id} className="dash-todo-row">
                    <div className="dash-todo-dot" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="dash-todo-text">{item.text}</div>
                      <div className="dash-todo-sub">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <section className="card">
        <div className="dash-section-header" style={{ marginBottom: '1rem' }}>
          <h2>Quick insights</h2>
        </div>
        <div className="dash-insights-grid">
          {quickInsights.map(function(stat) {
            return (
              <div key={stat.id} className="dash-insight-item">
                <div className="dash-insight-val">{stat.value}</div>
                <div className="dash-insight-lbl">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}

export default DashboardPage;
