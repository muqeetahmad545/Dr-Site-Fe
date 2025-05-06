// // src/pages/admin/AdminLayout.tsx

import DashboardLayout from "../../components/DashboardLayout";

// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import './AdminLayout.css'; // External CSS for styling

// export const AdminLayout = () => {
//   return (
//     <div className="admin-layout">
//       <div className="sidebar">
//         <h2 className="sidebar-title">Admin Panel</h2>
//         <nav className="sidebar-nav">
//           <Link className="nav-link" to="dashboard">Dashboard</Link>
//           <Link className="nav-link" to="settings">Settings</Link>
//         </nav>
//       </div>
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };


export const AdminLayout = () => {
  return <DashboardLayout role="admin" />;
};
