import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import ApplicationColumn from '../components/ApplicationColumn';

function ApplicationsPage(props) {
  const statuses = [
    {
      title: 'Saved',
      icon: '/img/icons/saved.svg'
    },
    {
      title: 'Applied',
      icon: '/img/icons/applied.svg'
    },
    {
      title: 'Interview',
      icon: '/img/icons/interview.svg'
    },
    {
      title: 'Offer',
      icon: '/img/icons/offer.svg'
    },
    {
      title: 'Rejected',
      icon: '/img/icons/rejected.svg'
    }
  ];

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>My Applications</h1>
          <p className="muted-text">A Kanban view of the application pipeline.</p>
        </div>
        <Link className="button" to="/add-job">+ Add Job</Link>
      </div>

      <section className="kanban-board">
        {statuses.map(function(status) {
          const statusJobs = props.jobs.filter(function(job) {
            return job.status === status.title;
          });

          let buttonText = '+ Add card';
          let buttonLink = '/add-job';

          if (status.title === 'Interview' || status.title === 'Offer') {
            buttonText = 'View workspace';
            buttonLink = '/detail';
          }

          return (
            <ApplicationColumn
              key={status.title}
              title={status.title}
              icon={status.icon}
              jobs={statusJobs}
              buttonText={buttonText}
              buttonLink={buttonLink}
            />
          );
        })}
      </section>
    </PageLayout>
  );
}

export default ApplicationsPage;
