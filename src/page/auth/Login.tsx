import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const errorStyles: React.CSSProperties = {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginBottom: '15px',
    textAlign: 'center',
};

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Muốn khi bấm 1 nút gì đó mà chuyển trang thì dùng useNavigate
    // 
    const handleLogin = () => {
        // Gửi dữ liệu lên server

        // Nếu thất bại thì hiển thị thông báo lỗi
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        // Nếu thành công thì chuyển trang
        localStorage.setItem("infor", JSON.stringify({ email, password }));
        // chuyển trang thì tham số đầu vào
        // Tham số thứ 1 là đường dẫn bắt buộc
        // Tham số thứ 2 là object trong đó có thể truyền dẽ liệu dạng object khác đến trang đích optional
        // Tham số thứ 3 là replace: true thì sẽ không quay lại trang trước đó optional
        // Nếu không có replace thì sẽ quay lại trang trước đó
        navigate('/admin/dashboard/1', { state: { email: email, password: password }, replace: true });

        // đầu tiên là /login
        // history /login
        // Khi chuyển trang đích 
        // Nếu replaxe là flase  => /login/trang đích ( tham số đầu tiên của navigate)
        // Nếu replaxe là true => /trang đích ( tham số đầu tiên của navigate)
    };

    return (
        <div style={containerStyles}>
            <h1 style={headingStyles}>Login</h1>
            {error && <p style={errorStyles}>{error}</p>}
            <div style={inputContainerStyles}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyles}
                />
            </div>
            <div style={inputContainerStyles}>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyles}
                />
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