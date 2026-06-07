import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [databaseError, setDatabaseError] = useState('');

  useEffect(function() {
    const auth = getAuth();

    const unregisterAuthListener = onAuthStateChanged(auth, function(firebaseUser) {
      setCurrentUser(firebaseUser);
      setIsCheckingAuth(false);
    });

    function cleanup() {
      unregisterAuthListener();
    }

    return cleanup;
  }, []);

  useEffect(function() {
    if (!currentUser) {
      setJobs([]);
      setIsLoadingJobs(false);
      setDatabaseError('');
      return undefined;
    }

    const db = getDatabase();
    const jobsRef = ref(db, 'users/' + currentUser.uid + '/jobs');

    setIsLoadingJobs(true);

    const unregisterDatabaseListener = onValue(jobsRef, function(snapshot) {
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
      unregisterDatabaseListener();
    }

    return cleanup;
  }, [currentUser]);

  function getUserJobsRef() {
    const db = getDatabase();
    return ref(db, 'users/' + currentUser.uid + '/jobs');
  }

  function addJob(newJob) {
    if (!currentUser) {
      return Promise.reject(new Error('You must log in first.'));
    }

    return firebasePush(getUserJobsRef(), newJob);
  }

  function deleteJob(jobKey) {
    if (!currentUser) {
      return Promise.reject(new Error('You must log in first.'));
    }

    const db = getDatabase();
    const jobRef = ref(db, 'users/' + currentUser.uid + '/jobs/' + jobKey);

    return firebaseSet(jobRef, null);
  }

  function updateJobField(jobKey, fieldName, fieldValue) {
    if (!currentUser) {
      return Promise.reject(new Error('You must log in first.'));
    }

    const db = getDatabase();
    const fieldRef = ref(db, 'users/' + currentUser.uid + '/jobs/' + jobKey + '/' + fieldName);

    return firebaseSet(fieldRef, fieldValue);
  }

  function handleSignOut() {
    const auth = getAuth();

    return signOut(auth);
  }

  function getProtectedElement(pageElement) {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    }

    if (isLoadingJobs) {
      return (
        <main className="container page-section">
          <section className="card">
            <h1>Loading Applications</h1>
            <p>Loading your saved applications from Firebase...</p>
          </section>
        </main>
      );
    }

    if (databaseError !== '') {
      return (
        <main className="container page-section">
          <section className="card">
            <h1>Database Error</h1>
            <p>{databaseError}</p>
          </section>
        </main>
      );
    }

    return pageElement;
  }

  if (isCheckingAuth) {
    return (
      <>
        <Header currentUser={currentUser} onSignOut={handleSignOut} />

        <main className="container page-section">
          <section className="card">
            <h1>Loading Account</h1>
            <p>Checking your JobTrack account...</p>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header currentUser={currentUser} onSignOut={handleSignOut} />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/auth"
          element={currentUser ? <Navigate to="/dashboard" /> : <AuthPage />}
        />

        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        <Route
          path="/dashboard"
          element={getProtectedElement(<DashboardPage jobs={jobs} />)}
        />

        <Route
          path="/jobs"
          element={getProtectedElement(
            <JobsPage
              jobs={searchJobs}
              applications={jobs}
              onSaveJob={addJob}
            />
          )}
        />

        <Route
          path="/jobs/:jobId"
          element={getProtectedElement(
            <DetailPage
              jobs={jobs}
              onDeleteJob={deleteJob}
              onUpdateJobField={updateJobField}
            />
          )}
        />

        <Route
          path="/applications"
          element={getProtectedElement(
            <ApplicationsPage jobs={jobs} onDeleteJob={deleteJob} />
          )}
        />

        <Route
          path="/detail"
          element={getProtectedElement(
            <DetailPage
              jobs={jobs}
              onDeleteJob={deleteJob}
              onUpdateJobField={updateJobField}
            />
          )}
        />

        <Route
          path="/analytics"
          element={getProtectedElement(<AnalyticsPage jobs={jobs} />)}
        />

        <Route
          path="/add-job"
          element={getProtectedElement(
            <AddJobPage onAddJob={addJob} nextId={jobs.length + 1} />
          )}
        />

        <Route
          path="/settings"
          element={getProtectedElement(<SettingsPage jobs={jobs} />)}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;