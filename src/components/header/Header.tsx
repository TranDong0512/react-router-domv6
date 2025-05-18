import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
const loginButtonStyles: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '0.9rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: '10px',
};
const navList = [
    { id: 1, name: 'Trang chủ', path: '/' },
    { id: 4, name: 'Sản phẩm', path: '/products' },
    { id: 2, name: 'Giới thiệu', path: '/about' },
    { id: 3, name: 'Liên hệ', path: '/contact' },
    { id: 5, name: 'Admin', path: '/admin/dashboard' },
]

export const Header = () => {
    const navigate = useNavigate();
    const infor = JSON.parse(localStorage.getItem('infor') || '{}');
    const handleLogout = () => {
        localStorage.removeItem('infor');
        navigate('/login', { replace: true });
    }
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <a href="../../assets/react.svg"></a>
                </div>
                <nav className="nav">
                    {navList.map((item) => (
                        <li key={item.id}>
                            <NavLink to={item.path} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </nav>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                    />
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                {infor && infor.email ? (
                    <div className="login-container">
                        <span style={{ marginRight: '10px' }}>Xin chào {infor?.email}</span>
                        <NavLink to="/login" style={loginButtonStyles} onClick={() => handleLogout()}>
                            Đăng xuất
                        </NavLink>
                    </div>
                ) : (<div className="login-container">
                    <NavLink to="/login" style={loginButtonStyles}>
                        Login
                    </NavLink>
                </div>)}
            </div>
        </header>
    );
};
