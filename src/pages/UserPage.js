
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from '../components/UserHeader';
import Account from '../components/Account';
import { updateUsername } from '../features/userSlice';

function UserPage() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const [newUsername, setNewUsername] = useState('');

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUsername(newUsername));
  };

  return (
    <main className="main bg-dark">
      <UserHeader />
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
      <section className="edit-username">
        <h3>Edit Username</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <label htmlFor="newUsername">New Username</label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </div>
          <button type="submit" className="edit-button">
            Update Username
          </button>
        </form>
      </section>
    </main>
  );
}

export default UserPage;
