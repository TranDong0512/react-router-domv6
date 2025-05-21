import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const nagigate = useNavigate();

    const [infor, setInfor] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!infor.email || !infor.password) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        localStorage.setItem('infor', JSON.stringify(infor));
        nagigate('/', { state: { from: infor } });
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Đăng nhập</h2>

                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Nhập email"
                        value={infor.email}
                        onChange={(e) => setInfor({ ...infor, email: e.target.value })}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={infor.password}
                        onChange={(e) => setInfor({ ...infor, password: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
