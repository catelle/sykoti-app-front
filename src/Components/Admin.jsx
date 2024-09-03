import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <nav>
        <Link to="/addlaws">Ajouter lois</Link>
        <Link to="/addscam">Ajouter scam</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Admin;
