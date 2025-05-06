import { Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/Settings';

import DoctorLayout from './pages/doctor/DoctorLayout';
import Patients from './pages/doctor/Patients';
import Schedule from './pages/doctor/Schedule';

import PatientLayout from './pages/patient/PatientLayout';
import Appointments from './pages/patient/Appointments';
import { Login } from './pages/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { PatientDashboard } from './pages/patient/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const user = getUser();

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

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
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
      </Route>

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
