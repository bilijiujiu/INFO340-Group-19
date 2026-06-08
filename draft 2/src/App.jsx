import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
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

function LoadingPanel() {
  return (
    <main className="container page-section">
      <section className="card">
        <h1>Loading Applications</h1>
        <p>Loading your saved applications from Firebase...</p>
      </section>
    </main>
  );
}

function DatabaseErrorPanel(props) {
  return (
    <main className="container page-section">
      <section className="card">
        <h1>Database Error</h1>
        <p>{props.message}</p>
      </section>
    </main>
  );
}

function AccountLoadingPanel() {
  return (
    <main className="container page-section">
      <section className="card">
        <h1>Loading Account</h1>
        <p>Checking your JobTrack account...</p>
      </section>
    </main>
  );
}

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

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

    const unregisterDatabaseListener = onValue(
      jobsRef,
      function(snapshot) {
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
      },
      function(error) {
        setDatabaseError('Could not load applications: ' + error.message);
        setIsLoadingJobs(false);
      }
    );

    function cleanup() {
      unregisterDatabaseListener();
    }

    return cleanup;
  }, [currentUser]);

  function addJob(newJob) {
    if (!currentUser) {
      return Promise.reject(new Error('You must log in first.'));
    }

    const db = getDatabase();
    const jobsRef = ref(db, 'users/' + currentUser.uid + '/jobs');

    return firebasePush(jobsRef, newJob);
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

  let dashboardElement = <Navigate to="/auth" />;
  let jobsElement = <Navigate to="/auth" />;
  let applicationsElement = <Navigate to="/auth" />;
  let detailElement = <Navigate to="/auth" />;
  let analyticsElement = <Navigate to="/auth" />;
  let addJobElement = <Navigate to="/auth" />;
  let settingsElement = <Navigate to="/auth" />;

  if (currentUser && isLoadingJobs) {
    dashboardElement = <LoadingPanel />;
    jobsElement = <LoadingPanel />;
    applicationsElement = <LoadingPanel />;
    detailElement = <LoadingPanel />;
    analyticsElement = <LoadingPanel />;
    addJobElement = <LoadingPanel />;
    settingsElement = <LoadingPanel />;
  }

  if (currentUser && databaseError !== '') {
    dashboardElement = <DatabaseErrorPanel message={databaseError} />;
    jobsElement = <DatabaseErrorPanel message={databaseError} />;
    applicationsElement = <DatabaseErrorPanel message={databaseError} />;
    detailElement = <DatabaseErrorPanel message={databaseError} />;
    analyticsElement = <DatabaseErrorPanel message={databaseError} />;
    addJobElement = <DatabaseErrorPanel message={databaseError} />;
    settingsElement = <DatabaseErrorPanel message={databaseError} />;
  }

  if (currentUser && !isLoadingJobs && databaseError === '') {
    dashboardElement = <DashboardPage jobs={jobs} user={currentUser} />;

    jobsElement = (
      <JobsPage
        jobs={searchJobs}
        applications={jobs}
        onSaveJob={addJob}
      />
    );

    applicationsElement = (
      <ApplicationsPage
        jobs={jobs}
        onDeleteJob={deleteJob}
      />
    );

    detailElement = (
      <DetailPage
        jobs={jobs}
        onDeleteJob={deleteJob}
        onUpdateJobField={updateJobField}
      />
    );

    analyticsElement = <AnalyticsPage jobs={jobs} />;

    addJobElement = (
      <AddJobPage
        onAddJob={addJob}
        nextId={jobs.length + 1}
      />
    );

    settingsElement = <SettingsPage jobs={jobs} />;
  }

  if (isCheckingAuth) {
    return (
      <>
        {!isAuthPage && (
          <Header
            currentUser={currentUser}
            onSignOut={handleSignOut}
          />
        )}

        <AccountLoadingPanel />

        {!isAuthPage && <Footer />}
      </>
    );
  }

  return (
    <>
      {!isAuthPage && (
        <Header
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/auth"
          element={currentUser ? <Navigate to="/dashboard" /> : <AuthPage />}
        />

        <Route path="/login" element={<Navigate to="/auth" />} />
        <Route path="/register" element={<Navigate to="/auth" />} />

        <Route path="/dashboard" element={dashboardElement} />
        <Route path="/jobs" element={jobsElement} />
        <Route path="/jobs/:jobId" element={detailElement} />
        <Route path="/applications" element={applicationsElement} />
        <Route path="/detail" element={detailElement} />
        <Route path="/analytics" element={analyticsElement} />
        <Route path="/add-job" element={addJobElement} />
        <Route path="/settings" element={settingsElement} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;