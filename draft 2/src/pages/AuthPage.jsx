import { useNavigate } from 'react-router';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/dist/StyledFirebaseAuth';
import 'firebaseui/dist/firebaseui.css';

function AuthPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  const FirebaseAuthComponent = StyledFirebaseAuth.default || StyledFirebaseAuth;

  const firebaseUIConfig = {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        requiredDisplayName: true
      }
    ],
    signInFlow: 'popup',
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: function() {
        navigate('/dashboard');
        return false;
      }
    }
  };

  return (
    <main className="auth-page-simple">
      <section className="auth-panel">
        <div className="auth-logo-row">
          <img className="jobtrack-logo" src="/img/jobtrack-logo.png" alt="" aria-hidden="true" />
          <p>JobTrack</p>
        </div>

        <h1>Welcome to JobTrack</h1>
        <p className="auth-description">
          Sign in or create an account to save jobs, track applications,
          and manage your job search progress.
        </p>

        <FirebaseAuthComponent uiConfig={firebaseUIConfig} firebaseAuth={auth} />

        <p className="auth-policy-text">
          By continuing, you agree to use JobTrack for tracking your own job search data.
        </p>
      </section>
    </main>
  );
}

export default AuthPage;