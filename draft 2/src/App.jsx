import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import startingJobs from './data/jobs';
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
  const [jobs, setJobs] = useState(startingJobs);

  function addJob(newJob) {
    setJobs(jobs.concat([newJob]));
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage jobs={jobs} />} />
        <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
        <Route path="/applications" element={<ApplicationsPage jobs={jobs} />} />
        <Route path="/detail" element={<DetailPage jobs={jobs} />} />
        <Route path="/analytics" element={<AnalyticsPage jobs={jobs} />} />
        <Route path="/add-job" element={<AddJobPage onAddJob={addJob} nextId={jobs.length + 1} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
