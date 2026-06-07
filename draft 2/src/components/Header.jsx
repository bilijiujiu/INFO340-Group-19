import { useState } from 'react';
import { NavLink } from 'react-router';

function getNavClass(navData) {
  if (navData.isActive) {
    return 'current-page';
  }

  return '';
}

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  function handleSignOutClick() {
    setSignOutError('');

    props.onSignOut()
      .catch(function(error) {
        setSignOutError('Sign out failed: ' + error.message);
      });
  }

  let navClass = 'top-nav';

  if (menuOpen) {
    navClass = 'top-nav open';
  }

  return (
    <header className="site-header">
      <div className="container header-layout">
        <div className="brand-heading">
          <img className="jobtrack-logo" src="/img/jobtrack-logo.png" alt="" aria-hidden="true" />
          <span className="site-title">JobTrack</span>
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={handleMenuClick}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          Menu
        </button>

        <nav id="main-navigation" className={navClass}>
          {!props.currentUser && (
            <>
              <NavLink to="/" className={getNavClass}>Landing</NavLink>
              <NavLink to="/auth" className={getNavClass}>Sign In</NavLink>
            </>
          )}

          {props.currentUser && (
            <>
              <NavLink to="/dashboard" className={getNavClass}>Dashboard</NavLink>
              <NavLink to="/jobs" className={getNavClass}>Jobs</NavLink>
              <NavLink to="/applications" className={getNavClass}>Applications</NavLink>
              <NavLink to="/analytics" className={getNavClass}>Analytics</NavLink>
              <NavLink to="/add-job" className={getNavClass}>Add Job</NavLink>
              <NavLink to="/settings" className={getNavClass}>Settings</NavLink>
              <span className="user-email">{props.currentUser.email}</span>
              <button className="button secondary-button" type="button" onClick={handleSignOutClick}>
                Sign Out
              </button>
            </>
          )}
        </nav>

        {signOutError !== '' && <p className="data-note">{signOutError}</p>}
      </div>
    </header>
  );
}

export default Header;