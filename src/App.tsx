import { Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/Settings';

import DoctorLayout from './pages/doctor/DoctorLayout';
import Patients from './pages/doctor/Patients';
import Schedule from './pages/doctor/Schedule';

import PatientLayout from './pages/patient/PatientLayout';
import Appointments from './pages/patient/Appointments';
import { LoginPage } from './pages/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { PatientDashboard } from './pages/patient/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SignupPage } from './pages/Signup';
import { NotFound } from './pages/NotFound';
import { COLORS } from './constants/theme';
import { ForgetPassword } from './pages/ForgetPassword';
import UserManagement from './pages/admin/UserManagement';
import HealthOverview from './pages/patient/HealthOverview';
import DoctorDashboard from './pages/doctor/Dashboard';
function App() {
  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const user = getUser();


const root = document.documentElement;

root.style.setProperty('--color-primary', COLORS.primary);
root.style.setProperty('--color-primaryHover', COLORS.primaryHover);
root.style.setProperty('--color-secondary', COLORS.secondary);
root.style.setProperty('--color-danger', COLORS.danger);
root.style.setProperty('--color-success', COLORS.success);
root.style.setProperty('--color-white', COLORS.white);

// root.style.setProperty('--padding', SIZES.padding);
// root.style.setProperty('--border-radius', `${SIZES.borderRadius}px`);


  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="userManagement" element={<UserManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>

      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="healthOverview" element={<HealthOverview />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
