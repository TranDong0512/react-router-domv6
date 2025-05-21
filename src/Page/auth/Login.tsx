import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToggle from '../../hook/toggle/useToggle';
import { useAuth } from '../../hook/auth/useAuth';

// Define styles for the Login page
const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
};

const headingStyles: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
};

const inputContainerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '15px',
    position: 'relative'
};

const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    boxSizing: 'border-box',

};

const buttonStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
};

const linkStyles: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#007bff',
    textDecoration: 'none',
};

const iconStyles: React.CSSProperties = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#666',
    width: '20px',
    height: '20px',
};
export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth()
    const [inFor, setInFor] = useState({
        email: "",
        password: ""
    })

    const [showPass, toggleShowPass] = useToggle(false)

    const handleLogin = () => {
        const { email, password } = inFor
        if (!email || !password) {
            return;
        }
        login(email)
        navigate('/', { state: { email: email }, replace: true });
    };

    return (
        <div style={containerStyles}>
            <h1 style={headingStyles}>Login</h1>
            <div style={inputContainerStyles}>
                <input
                    type="email"
                    placeholder="Email"
                    value={inFor.email}
                    onChange={(e) => setInFor({ ...inFor, email: e.target.value })}
                    style={inputStyles}
                />
            </div>
            <div style={inputContainerStyles}>
                <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={inFor.password}
                    onChange={(e) => setInFor({ ...inFor, password: e.target.value })}
                    style={inputStyles}
                />
                <svg
                    onClick={toggleShowPass}
                    style={iconStyles}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {showPass ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.625 0 3.122.487 4.375 1.325M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7 1.274-4.057 5.065-7 9.542-7 4.477 0 8.268 2.943 9.542 7zm-2.828 0a9.966 9.966 0 01-1.415 4.243M3.243 16.243A9.966 9.966 0 011.415 12m2.828-4.243A9.966 9.966 0 011.415 12m17.314 0a9.966 9.966 0 01-1.415-4.243M20.757 7.757l-16.514 16.514"
                        />
                    )}
                </svg>
            </div>

            <button onClick={handleLogin} style={buttonStyles}>
                Login
            </button>
            <p>
                Don't have an account?{' '}
                <Link to="/register" style={linkStyles}>
                    Register
                </Link>
            </p>
        </div>
    );
};