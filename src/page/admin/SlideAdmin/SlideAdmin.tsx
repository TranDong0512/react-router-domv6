import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SlideAdmin() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                </div>
                <nav className="mt-4">
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            `block py-2 px-4 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        Settings
                    </NavLink>
                    <button
                        className="block w-full text-left py-2 px-4 hover:bg-gray-700"
                    >
                        Logout
                    </button>
                </nav>
            </div>

            {/* Toggle Button for Mobile */}
            <button
                className="md:hidden p-4 text-gray-800"
                onClick={toggleSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
}

export default SlideAdmin;