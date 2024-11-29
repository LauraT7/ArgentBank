import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';
import { loginUser, fetchUserProfile } from '../features/authSlice';
import './css/SignIn.css';
import './css/GlobalStyles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      const { userName, firstName, lastName } = await dispatch(fetchUserProfile()).unwrap();
      dispatch(login({ userName, firstName, lastName }));
      navigate('/user');
    } catch (err) {
      if (err.includes('Password')) {
        setError('Le mot de passe est incorrect. Veuillez réessayer.');
      } else if (err.includes('User')) {
        setError("L'utilisateur n'existe pas. Vérifiez votre adresse email.");
      } else {
        setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
          {error && <p>{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
