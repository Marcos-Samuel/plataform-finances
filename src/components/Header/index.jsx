import React, { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import avatar from '../../assets/avatar.svg';
import { clear, getItem } from '../../utils/storage';
import EditUser from '../EditUser';
import Modal from '../Modal';
import useUser from '../../hooks/useUser';

function Header({ user, setUser, error, setError }) {

    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useUser();

    const token = getItem('@dindin:token');

    const handleExit = () => {
        clear();
        navigate('/');
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={setIsOpen}
                children={
                    <EditUser
                        user={user}
                        setUser={setUser}
                        isOpen={isOpen}
                        onClose={setIsOpen}
                        error={error}
                        setError={setError}
                    />
                }
            />

            <header className="header">
                <div>
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Dindin</h1>
                </div>
                {token && <div className="user-info">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="avatar-icon" onClick={() => setIsOpen(!isOpen)}
                    />
                    <p>
                        {user.nome}
                    </p>
                    <img
                        src={logoutIcon}
                        alt="Logout"
                        className="logout-icon"
                        onClick={handleExit}
                    />
                </div>}

            </header>
        </>
    )
}

export default Header;