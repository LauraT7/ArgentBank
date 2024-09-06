import React from 'react';
import { useSelector } from 'react-redux';

function UserHeader() {
  const username = useSelector((state) => state.user.username);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="header">
      {isLoggedIn ? (
        <h1>Welcome back<br />{username}!</h1>
      ) : (
        <h1>Welcome to Argent Bank!</h1>
      )}
    </div>
  );
}

export default UserHeader;
