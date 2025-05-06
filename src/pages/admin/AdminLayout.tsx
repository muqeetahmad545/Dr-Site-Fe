import { Link, Outlet } from 'react-router-dom';

export const AdminLayout=()=> {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <Link to="dashboard">Dashboard</Link> | 
        <Link to="settings">Settings</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
