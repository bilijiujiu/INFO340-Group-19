import { useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../components/PageLayout';
import ApplicationColumn from '../components/ApplicationColumn';

function ApplicationsPage(props) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');

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

  function handleDelete(job) {
    const jobKey = job.key || job.id;

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

  const applicationColumns = statuses.map(function(status) {
    const statusJobs = props.jobs.filter(function(job) {
      return job.status === status.title;
    });

    return (
      <ApplicationColumn
        key={status.title}
        title={status.title}
        icon={status.icon}
        jobs={statusJobs}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <PageLayout>
      <div className="page-heading">
        <div>
          <h1>My Applications</h1>
          <p className="muted-text">A Kanban view of the application pipeline.</p>
        </div>
        <Link className="button" to="/add-job">+ Add Job</Link>
      </div>

      {deleteMessage !== '' && <p className="data-note">{deleteMessage}</p>}
      {deleteError !== '' && <p className="data-note">{deleteError}</p>}

      <section className="kanban-board">
        {applicationColumns}
      </section>
    </PageLayout>
  );
}

export default ApplicationsPage;
