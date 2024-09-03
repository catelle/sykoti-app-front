import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../contexts/firebaseSetup';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import styles for PhoneInput



const Register = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const pseudoRef = useRef();
  const passwordConfirmationRef = useRef();
  const [phone, setPhone] = useState(''); // State to manage phone number
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setErrors(null);
    setLoading(true); // Set loading to true when the form is submitted

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const pseudo = pseudoRef.current.value;

    try {
      // Check if the pseudo is unique
      const pseudoQuery = query(collection(db, "usersCollection"), where("pseudo", "==", pseudo));
      const querySnapshot = await getDocs(pseudoQuery);
      if (!querySnapshot.empty) {
        throw new Error("This pseudo is already taken. Please choose another one.");
      }

      // Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "usersCollection", user.uid), {
        email: user.email,
        firstName: nameRef.current.value,
        pseudo: pseudo,
        phone: phone, // Save the phone number with country code
        lastName: "test",
        photo: "",
        role:""
      });

      // Send email verification
      await sendEmailVerification(user);
      alert('Verification email sent. Please check your inbox.');

      console.log("User Registered Successfully!!");
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      console.log(error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h1 className='title'>Signup for free</h1>
        {errors && <div className='alert'>{errors.general && <p>{errors.general}</p>}</div>}

        <input ref={nameRef} type="text" placeholder="Nom" disabled={loading} />
        <input ref={pseudoRef} type="text" placeholder="Pseudo" disabled={loading} />
        <input ref={emailRef} type="email" placeholder="Adresse email" disabled={loading} />

        {/* Country selector and phone input */}
        <PhoneInput
          country={'us'}
          value={phone}
          onChange={phone => setPhone(phone)}
          disabled={loading}
          inputStyle={{ width: '100%' }}
          placeholder="Numéro téléphone"
        />

        <input ref={passwordRef} type="password" placeholder="Mot de passe" disabled={loading} />
        <input ref={passwordConfirmationRef} type="password" placeholder="Confirmation du mot de passe" disabled={loading} />

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Please wait..." : "Sign up"}
        </button>

        <p className="message">
          Already Registered <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};
export default Register
