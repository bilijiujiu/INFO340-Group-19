import { useState } from 'react';
import { useNavigate } from 'react-router';

function AuthPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate('/dashboard');
  }

  function handleSignup(event) {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <main className="container page-section">
      <div className="section-heading">
        <h1>Log In or Sign Up</h1>
        <p>Enter your information to continue to your JobTrack dashboard.</p>
      </div>

      <div className="auth-grid">
        <section className="card">
          <h2>Log In</h2>

          <form className="form-stack" onSubmit={handleLogin}>
            <div className="form-row">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={function(event) {
                  setLoginEmail(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="login-password"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={function(event) {
                  setLoginPassword(event.target.value);
                }}
                required
              />
            </div>

            <button className="button" type="submit">
              Log In
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Create Account</h2>

          <form className="form-stack" onSubmit={handleSignup}>
            <div className="form-row">
              <label htmlFor="signup-name">Name</label>
              <input
                id="signup-name"
                name="signup-name"
                type="text"
                placeholder="Your name"
                value={signupName}
                onChange={function(event) {
                  setSignupName(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                name="signup-email"
                type="email"
                placeholder="you@example.com"
                value={signupEmail}
                onChange={function(event) {
                  setSignupEmail(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="signup-password"
                type="password"
                placeholder="Create a password"
                value={signupPassword}
                onChange={function(event) {
                  setSignupPassword(event.target.value);
                }}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={function(event) {
                  setConfirmPassword(event.target.value);
                }}
                required
              />
            </div>

            <button className="button" type="submit">
              Create Account
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;
