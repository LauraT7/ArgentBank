import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../features/userSlice";
import "./css/Header.css";

function UserHeader() {
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const userName = useSelector((state) => state.user.userName) || "Utilisateur"; 
    const firstName = useSelector((state) => state.auth?.firstName) || "Prénom manquant";
    const lastName = useSelector((state) => state.auth?.lastName) || "Nom manquant";
    const token = useSelector((state) => state.auth?.token);
    const dispatch = useDispatch();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

    const handleSaveClick = async () => {
        if (!newUserName) {
            alert("Le nom d'utilisateur ne peut pas être vide.");
            return;
        }

        const requestBody = {
            userName: newUserName,
            firstName: firstName, 
            lastName: lastName, 
        };

        const response = await fetch(`${API_URL}/v1/user/profile`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Mise à jour réussie :", data.body);

            dispatch(updateUserName(data.body.userName));
            setIsEditing(false);
        } else {
            console.error("Erreur lors de la mise à jour :", data.message);
        }
    };

    return (
        <div className="header">
            {!isEditing ? (
                <>
                    <h1>
                        Welcome back<br />
                        <span>{userName}</span>
                    </h1>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                </>
            ) : (
                <form className="edit-form">
                    <label>
                        User Name:
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                    </label>
                    <label>
                        First Name:
                        <input type="text" value={firstName} disabled />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" value={lastName} disabled />
                    </label>
                    <div className="edit-button-form">
                        <button className="edit-button" type="button" onClick={handleSaveClick}>
                            Save
                        </button>
                        <button className="edit-button" type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UserHeader;
