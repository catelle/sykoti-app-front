import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useStateContext } from '../../contexts/contentprovider';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo2.png';
import Notification from '../Notification/Notification';
import { auth, db} from '../../contexts/firebaseSetup';
import { getDoc,doc } from 'firebase/firestore';






const Navbar = () => {
  const { user, setUser, setToken } = useStateContext();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sticky,setSticky]= useState(false);
  const navbarRef = useRef(null);
  const [pseudo, setPseudo] = useState(''); // State to store user pseudo
  const [userid, setUserid] = useState('');
  const { token, isAdmin, notification, setIsAdmin } = useStateContext();
  const [displayside,setDisplayside]= useState(true);


  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          // Fetch user document from Firestore
          const docRef = doc(db, "usersCollection", authUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists) {
            setPseudo(docSnap.data().pseudo); // Set the user pseudo from Firestore
            setUserid(authUser.uid);
           console.log(docSnap.data());
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

  const onLogout = async (ev) => {
    ev.preventDefault();

    try {
      await auth.signOut(); // Use Firebase signOut method
      setUser(null); // Clear user state on logout
      setPseudo(''); // Clear pseudo on logout
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error); // Handle errors
    }
  };
  useEffect(()=>{

    window.addEventListener('scroll',()=>{
      window.scrollY> 50 ? setSticky(true):setSticky(false);
    })
  },[]);
  

  

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsNavbarOpen(false);
    }
  };
  const handleCategoryClick = (category) => {
    navigate(`/fak/${category}`);
  };
  const handleSosAdos = () => {
    navigate('/sosados');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  const openside = () => {
    setDisplayside((prevState) => {
      console.log(!prevState);
      return !prevState;
    });
  };
  const closeSidebar = () => {
    if (window.innerWidth < 768) { // Adjust the width as per your small screen definition
      setDisplayside(false);
    }
  };
  return (
    <div> 
   {displayside && (
  <aside className="sidebar2">
    <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
    <Link to="/lois" onClick={closeSidebar}>Lois cybersécurité</Link>
    <Link to="/scamtrends" onClick={closeSidebar}>Infos scam</Link>
    <Link to="/testimonies" onClick={closeSidebar}>Témoignage</Link>
    <Link to="/help" onClick={closeSidebar}>Aide</Link>
    {isAdmin && <Link to="/addlaws" onClick={closeSidebar}>Ajouter Lois</Link>}
    {isAdmin && <Link to="/addscam" onClick={closeSidebar}>Ajouter Scam</Link>}
    {isAdmin && <Link to="/urgence" onClick={closeSidebar}>Urgence</Link>}
    {isAdmin && <Link to="/createfak" onClick={closeSidebar}>Add fak</Link>}
  </aside>
)}


    <nav className={`navbar navbar-expand-lg fixed-top ${sticky? `dark-nav`: ``} ${isNavbarOpen ? 'open' : ''}`} ref={navbarRef}>
      <div className="container-fluid">
      <button
          type="button"
          onClick={openside}
         className="sidebtn"
        > <ion-icon name="grid"></ion-icon>
        </button>
        <img src={logo} alt="logo"  className='logo'/>
        <h2 className="navbar-name">Sykoti</h2>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavbarOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link"  aria-current="page" to="/dashboard">Accueil</Link>
            </li>
           
           
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                
              >
                Tips
              </a>
              <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to='/fak/Catfish'>Ingenierie sociale</Link></li>
              <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='/fak/Catfish'>Catfish</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='/fak/Escroquerie'  onClick={() => handleCategoryClick('Escroqueries')}>Escroqueries</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"   to='/fak/cyberdiscipline'>Cyberdiscipline</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"  to='/fak/Cyberharcelement' onClick={() => handleCategoryClick('Cyberharcelement')}>Cyberharcelement</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='/fak/Cybermediation'  onClick={() => handleCategoryClick('Cybermediation')}>Cybermediation</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"  to='/fak/Equipements' onClick={() => handleCategoryClick('Equipements')}>Equipements</Link></li>
             
             
                
              </ul>
            </li>
        
          

           
           
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                
              >

                
                Outils
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='https://www.virustotal.com/gui/home/search'>Scan fichiers</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='https://nordvpn.com/fr/link-checker/?srsltid=AfmBOopcWGF7w8prDAaxDw7-dKfJEVRkHOrtw5WDR_lTcBksw9OPOadc'>Scan url</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"   to='https://nordpass.com/fr/secure-password/'>Mot de passe</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"  to='https://www.africaonlinesafety.com/platform-reporting'>Reseaux sociaux support</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='https://www.trustedsite.com/safe-browsing'  >Evaluateur de siteweb</Link></li>
               
                
              </ul>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link"  to="/service">CyberCampaigns</Link>
            </li> */}
            
            

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                
              >

                
                Entreprises
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='/service'>Campagnes sensibillisations</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to=''>Web App Pentesting</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"   to=''>Bug Bounting</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"  to='https://catelle.github.io/Sykoti-site-web/'>About us</Link></li>
               
                
              </ul>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link"  to="https://catelle.github.io/Sykoti-site-web/">Services</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link"  to="">Gaming zone</Link>
            </li> */}
            <li>
          <Notification userId={userid} />
            </li>
            <li className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                
              >
                <ion-icon name="share-social"></ion-icon>
      
      
   

                
              
                </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='/testify'>Temoigner</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='/spreadscam'>Partager arnaque</Link></li>
                <li><hr className="dropdown-divider" /></li>
               
              </ul>
            </li>
          </ul>
          
          <div className="navbar-user">
            {user ? (
              <>
                <Link className="nav-link" to="/profileuser">{pseudo}</Link>
                <a href="#" onClick={onLogout} className="logout"><ion-icon name="log-out"></ion-icon></a>
              </>
            ) : (
              <Link className="nav-link" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    </div>

  );
};

export default Navbar;