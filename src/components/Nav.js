import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import './css/Nav.css';
import logo from './css/img/argentBankLogo.webp';

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.userName);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isLoggedIn ? (
          <>
            <a className="main-nav-item" href="/user">
              <i className="fa fa-user-circle"></i>
              {userName || 'Utilisateur'}
            </a>
            <a
              className="main-nav-item"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

export default Nav;
