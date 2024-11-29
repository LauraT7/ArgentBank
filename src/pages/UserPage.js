import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserHeader from '../components/UserHeader';
import Account from '../components/Account';
import { updateUserName } from '../features/userSlice';

function UserPage() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const [newUserName, setNewUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserNameChange = (e) => setNewUserName(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newUserName) {
      setErrorMessage("Le champ ne peut pas être vide.");
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          userName: newUserName,
        }),
      });

      if (response.ok) {
        dispatch(updateUserName(newUserName));
        setSuccessMessage('Votre nom d’utilisateur a été mis à jour avec succès !');
      } else {
        setErrorMessage('Une erreur est survenue lors de la mise à jour.');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
      setErrorMessage('Impossible de mettre à jour votre nom d’utilisateur.');
    }
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

    </main>
  );
}

export default UserPage;
