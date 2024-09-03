import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contentprovider';


const GuestLayout = () => {
  const {token}= useStateContext;
  if(token){
    return <Navigate to='/'/>}
  return (
    <div className="login-signup-form animated fadeInDown">

					<div className="form">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
            <Outlet /> {/* Renders the matched child route */}
          </div>
    </div>
  );
};

export default GuestLayout;