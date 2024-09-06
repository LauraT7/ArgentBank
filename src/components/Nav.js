import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as userLogout } from '../features/userSlice';  // Logout from userSlice
import { logout as authLogout } from '../features/authSlice'; 
import './css/Nav.css';
import logo from './css/img/argentBankLogo.png';

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const firstName = useSelector((state) => state.user.firstName);  // Récupérer le prénom depuis Redux
  const lastName = useSelector((state) => state.user.lastName);  // Récupérer le nom de famille depuis Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);  // Vérifier si l'utilisateur est connecté

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(authLogout());
    localStorage.clear();
    navigate('/sign-in');
    window.location.reload();  // Forcer le rechargement de la page pour éviter le cache
  };
  
  return (
    <nav className="main-nav">
      <button className="main-nav-logo" onClick={() => navigate('/')}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </button>
      <div>
        {isLoggedIn ? (
          <>
            <button className="main-nav-item" onClick={() => navigate('/user')}>
              <i className="fa fa-user-circle"></i>
              {firstName} {lastName}  {/* Afficher le prénom et le nom */}
            </button>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <button className="main-nav-item" onClick={() => navigate('/sign-in')}>
            <i className="fa fa-sign-in"></i>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
