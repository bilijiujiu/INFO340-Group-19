import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { getDatabase, onValue, push as firebasePush, ref, set as firebaseSet } from 'firebase/database';
import Header from './components/Header';
import Footer from './components/Footer';
import searchJobs from './data/searchJobs';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import DetailPage from './pages/DetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AddJobPage from './pages/AddJobPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [databaseError, setDatabaseError] = useState('');

  useEffect(function() {
    const db = getDatabase();
    const jobsRef = ref(db, 'jobs');

    const unregisterFunction = onValue(jobsRef, function(snapshot) {
      const jobsObject = snapshot.val();

      if (jobsObject) {
        const jobKeys = Object.keys(jobsObject);
        const firebaseJobs = jobKeys.map(function(key) {
          const job = { ...jobsObject[key] };
          job.key = key;

          if (!job.id) {
            job.id = key;
          }

          return job;
        });

        setJobs(firebaseJobs);
      } else {
        setJobs([]);
      }

      setIsLoadingJobs(false);
      setDatabaseError('');
    }, function(error) {
      setDatabaseError('Could not load applications: ' + error.message);
      setIsLoadingJobs(false);
    });

    function cleanup() {
      unregisterFunction();
    }

    return cleanup;
  }, []);

  function addJob(newJob) {
    const db = getDatabase();
    const jobsRef = ref(db, 'jobs');

    return firebasePush(jobsRef, newJob);
  }

  function deleteJob(jobKey) {
    const db = getDatabase();
    const jobRef = ref(db, 'jobs/' + jobKey);

    return firebaseSet(jobRef, null);
  }

  function updateJobField(jobKey, fieldName, fieldValue) {
    const db = getDatabase();
    const fieldRef = ref(db, 'jobs/' + jobKey + '/' + fieldName);

    return firebaseSet(fieldRef, fieldValue);
  }

  return (
    <>
      <Header />

      {isLoadingJobs && (
        <main className="container page-section">
          <section className="card">
            <h1>Loading applications</h1>
            <p>Loading applications from Firebase...</p>
          </section>
        </main>
      )}

      {databaseError !== '' && (
        <main className="container page-section">
          <section className="card">
            <h1>Database Error</h1>
            <p>{databaseError}</p>
          </section>
        </main>
      )}

      {!isLoadingJobs && databaseError === '' && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage jobs={jobs} />} />
          <Route
            path="/jobs"
            element={
              <JobsPage
                jobs={searchJobs}
                applications={jobs}
                onSaveJob={addJob}
              />
            }
          />
          <Route
            path="/jobs/:jobId"
            element={
              <DetailPage
                jobs={jobs}
                onDeleteJob={deleteJob}
                onUpdateJobField={updateJobField}
              />
            }
          />
          <Route path="/applications" element={<ApplicationsPage jobs={jobs} onDeleteJob={deleteJob} />} />
          <Route
            path="/detail"
            element={
              <DetailPage
                jobs={jobs}
                onDeleteJob={deleteJob}
                onUpdateJobField={updateJobField}
              />
            }
          />
          <Route path="/analytics" element={<AnalyticsPage jobs={jobs} />} />
          <Route path="/add-job" element={<AddJobPage onAddJob={addJob} nextId={jobs.length + 1} />} />
          <Route path="/settings" element={<SettingsPage jobs={jobs} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
