import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/contentprovider';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../contexts/firebaseSetup';
import { doc, getDoc } from 'firebase/firestore';


export default function Login() {
    const pseudoRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setToken, setUser, setIsAdmin } = useStateContext();
    const navigate = useNavigate(); // Initialize the navigate function

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setErrors(null); // Reset errors

        const email = pseudoRef.current.value; // Assuming pseudoRef is now emailRef
        const password = passwordRef.current.value;

        try {
            // Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if the email is verified
            if (user.emailVerified) {
                // Set user context or any other necessary state
                setUser(user);

                // Store the token or any other data you need
                localStorage.setItem('ACCESS_TOKEN', await user.getIdToken());
                 setToken(await user.getIdToken());
                
                      try {
                        // Fetch user document from Firestore
                        const docRef = doc(db, "usersCollection", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists) {

                             // Check for admin role if applicable
                            if(docSnap.data().role==="admin"){
                                setIsAdmin(true); 
                            }else{
                                setIsAdmin(false); 
                            }
                          
                          setUser(user);
                        }
                        // Set the user state
                      } catch (error) {
                        console.error("Error fetching user data:", error);
                      }
                   
                   

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                throw new Error("Your email is not verified. Please check your inbox and verify your email address before logging in.");
            }
        } catch (error) {
            console.error(error);
            setErrors({ general: error.message });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login to your account</h1>

            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key]}</p>
                ))}
            </div>}

            <input ref={pseudoRef} type="email" placeholder="Email" /> {/* Change placeholder to Email */}
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered <Link to="/register">Sign Up</Link>
            </p>
        </form>
    );
}
