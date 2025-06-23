import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminSetting from "./pages/admin/Settings";

import DoctorLayout from "./pages/doctor/DoctorLayout";
import Patients from "./pages/doctor/Patients";
import Schedule from "./pages/doctor/Schedule";

import PatientLayout from "./pages/patient/PatientLayout";
import Appointments from "./pages/patient/Appointments";
import { LoginPage } from "./pages/Login";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { PatientDashboard } from "./pages/patient/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SignupPage } from "./pages/Signup";
import { NotFound } from "./pages/NotFound";
import { COLORS } from "./constants/theme";
import { ForgetPassword } from "./pages/ForgetPassword";
import HealthOverview from "./pages/patient/HealthOverview";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AllDoctors from "./pages/admin/Doctors";
import AllPatients from "./pages/admin/Patients";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import AddPatient from "./pages/admin/AddPatient";
import AddAppointment from "./pages/admin/AddAppointment";
import PatientSetting from "./pages/patient/Settings";
import DoctorSetting from "./pages/doctor/Settings";
import { Verification } from "./pages/Verification";
import PatientLogin from "./pages/PatientLogin";
import ProfileSetup from "./pages/ProfileSetup";
import Admin from "./pages/superAdmin/admin";
import AddAdmin from "./pages/superAdmin/addAdmin";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import { SuperAdminLayout } from "./pages/superAdmin/AdminLayout";
import CallRoom from "./pages/doctor/CallRoom";
function App() {
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const user = getUser();

  const root = document.documentElement;

  root.style.setProperty("--color-primary", COLORS.primary);
  root.style.setProperty("--color-primaryHover", COLORS.primaryHover);
  root.style.setProperty("--color-secondary", COLORS.secondary);
  root.style.setProperty("--color-danger", COLORS.danger);
  root.style.setProperty("--color-success", COLORS.success);
  root.style.setProperty("--color-white", COLORS.white);
  root.style.setProperty("--gradient-primary", COLORS.gradientPrimary);

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
      <Route path="/profile-setup/:token" element={<ProfileSetup />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/meeting" element={<CallRoom />} />

      <Route
        path="/SuperAdmin"
        element={
          <ProtectedRoute role="SuperAdmin">
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="edit-admin/:id" element={<AddAdmin />} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<AllDoctors />} />
        <Route path="patients" element={<AllPatients />} />
        <Route path="all-appointments" element={<AllAppointments />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="edit-doctor/:id" element={<AddDoctor />} />
        <Route path="add-patient" element={<AddPatient />} />
        <Route path="edit-patient/:id" element={<AddPatient />} />
        <Route path="add-appointment" element={<AddAppointment />} />
        <Route path="edit-appointment/:id" element={<AddAppointment />} />
        <Route path="settings" element={<AdminSetting />} />
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
        <Route path="patient" element={<Patients />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<DoctorSetting />} />
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
        <Route path="health-overview" element={<HealthOverview />} />
        <Route path="settings" element={<PatientSetting />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
