import { Link, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../axios-client';
import './DefaultLayout.css'
import { useStateContext } from '../contexts/contentprovider';
import Navbar from './Navbar/Navbar';
import { auth, db } from '../contexts/firebaseSetup';
import { doc, getDoc } from 'firebase/firestore';






const DefaultLayout = () => {

  const { user, token, isAdmin, notification, setUser, setToken, setIsAdmin } = useStateContext();
  const [isOpen, setIsOpen]= useState(true)

  if (!token) {
    console.log(token);
    return <Navigate to='/login' />
  }

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          // Fetch user document from Firestore
          const docRef = doc(db, "usersCollection", authUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists) {
            setUser(authUser);
          }
          // Set the user state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null); // Clear user state if not authenticated
      }
      setLoading(false); // Set loading to false once user is fetched
    });

    return () => unsubscribeAuth(); // Clean up subscription on component unmount
  }, []);

  // useEffect(() => {
  //   axiosClient.get('/user')
  //     .then(({ data }) => {

  //       setUser(data)
  //     }

  //     )

  // }, [])

  // const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  // const sidebarRef = useRef(null);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // const handleClickOutside = (event) => {
  //   if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen && window.innerWidth < 768) {
  //     setIsSidebarOpen(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div>  
      <Navbar/>
    <div id="defaultLayout" >
     
     
     



      <div className="content">
 
      <div className="notification">
      {notification }
      </div>
       
        

         
        <main>
          <Outlet />
        </main>
      </div>
    </div>
    </div>

  );
};

export default DefaultLayout;
