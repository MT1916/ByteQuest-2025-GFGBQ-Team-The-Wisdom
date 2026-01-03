import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="p-10 text-center">Loading Authorization...</div>;
    }

    if (!user) {
        // Not logged in -> Redirect to Landing/Role Selection
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Logged in but wrong role -> Show Access Denied
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
                <ShieldAlert size={64} className="text-red-600" />
                <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
                <p className="text-gray-600 max-w-md text-center">
                    Your wallet
                    <span className="font-mono bg-gray-200 px-2 py-0.5 rounded mx-1 text-sm">{user.address}</span>
                    does not have the required permissions <strong>({allowedRoles.join(' or ')})</strong> to view this page.
                </p>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest text-center mb-1">Current Role</p>
                    <p className="text-xl font-bold text-primary text-center">{user.role}</p>
                </div>
                <button
                    onClick={() => window.location.href = "/"} // Force reset to home
                    className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    // Authorized -> Render Child Routes
    return <Outlet />;
};

export default ProtectedRoute;
