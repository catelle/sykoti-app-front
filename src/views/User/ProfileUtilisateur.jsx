import React, { useEffect, useRef, useState } from 'react'
import './ProfileUtilisateur.css'
import { useStateContext } from '../../contexts/contentprovider';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';

const ProfileUtilisateur = () => {

  const navigate = useNavigate(); 
  const { user, setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const pseudoRef= useRef();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);


  const onSubmit = async (event) => {
    const newErrors = {};
    if (!nameRef.current.value) newErrors.name = ['Name is required'];
    if (!emailRef.current.value) newErrors.email = ['Email is required'];
    if (!phoneRef.current.value) newErrors.phone = ['Phone is required'];
    if (!pseudoRef.current.value) newErrors.pseudo = ['Pseudo is required'];
    if (passwordRef.current.value && passwordRef.current.value !== passwordConfirmationRef.current.value) {
      newErrors.password = ['Passwords do not match'];
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      event.preventDefault();
      
      // Example of form submission handling
      const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          pseudo: pseudoRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
      };

    
      axiosClient.put(`/user/${user.id}`, payload)
      .then(({ data }) => {
          
          console.log(data);
          navigate('/dashboard'); 
      })
      .catch((error) => {
          console.log(error);

          const response = error.response;

          if (response && response.status === 422) {

    if(response.data.errors){

      setErrors(response.data.errors);

    }else{

    setErrors({
      email:[response.data.message]
    })
    }
              
          }
      });
};
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 5000); // Clear errors after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [errors]);

if (loading) {
  return <div>Loading...</div>; // Or any loading spinner/component
}

  return (
      <div className="form-container">
          <form className="request-form" onSubmit={onSubmit}>
              <h1 className='title'>
                  Update Profile
              </h1>
              {Object.keys(errors || {}).length > 0 && (
          <div className='alert'>
            {Object.keys(errors || {}).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <input ref={nameRef} type="text" className='form-controlt' defaultValue={user.name} placeholder="Name" />
        <input ref={pseudoRef} type="text" className='form-controlt' defaultValue={user.pseudo} placeholder="Pseudo" />
        <input ref={emailRef} type="email" className='form-controlt' defaultValue={user.email} placeholder="Email" />
        <input ref={phoneRef} type="text" className='form-controlt' defaultValue={user.phone} placeholder="Phone" />
        <input ref={passwordRef} type="password" className='form-controlt' placeholder="New Password" />
        <input ref={passwordConfirmationRef} className='form-controlt' type="password" placeholder="Confirm New Password" />
        <button className="btn btn-block">Update</button>
              {/* <p className="message">
                  Back to <Link to="/profile">Profile</Link>
              </p> */}
          </form>
      </div>
  );
};



export default ProfileUtilisateur