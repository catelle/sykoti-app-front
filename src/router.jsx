import { createBrowserRouter } from 'react-router-dom';
import Welcome from './views/Welcome';
import DefaultLayout from './Components/DefaultLayout';
import GuestLayout from './Components/GuestLayout';
import Login from './views/User/Login';
import Register from './views/User/Register';
import Notfoundview from './views/Notfoundview';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import Scamtrends from './views/Scamtrends/Scamtrends';
import Help from './views/Help/Help';
import Testify from './views/Testify/Testify.jsx';
import Spreadscam from './views/Spreadscam/Spreadscam.jsx';
import ProfileUtilisateur from './views/User/ProfileUtilisateur.jsx';
import Lois from './views/Lois/Lois.jsx';
import Admin from './Components/Admin.jsx';
import Addlaws from './views/Addlaws/Addlaws.jsx';
import Addscam from './views/Addscam/Addscam.jsx';
import Submittedalerts from './views/SubmittedAlerts/Submittedalerts.jsx';
import Urgence from './views/Urgence/Urgence.jsx';
import MessageDetail from './Components/MessageDetail/MessageDetail.jsx';
import Testimonies from './views/Testimonies/Testimonies.jsx';
import StoryDetails from './Components/StoryDetails/StoryDetails.jsx';
import Cyberambassador from './views/Cyberambassador/Cyberambassador.jsx';
import Fakcat from './views/Fak/Fakcat.jsx';
import Fakdetails from './Components/FakDetails/Fakdetails.jsx';
import CreateFak from './views/Fak/CreateFak.jsx';
import Service from './views/Service/Service.jsx';


// Define routes with distinct base paths
const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />, // Layout for guest routes
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />, // Layout for authenticated routes
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'scamtrends',
        element: <Scamtrends />,
      },
      {
        path:'testify',
        element:<Testify/>,
      },
      {
        path:'help',
        element:<Help/>,
      },
      {
        path:'spreadscam',
        element:<Spreadscam/>
      }, 
      {
        path:'profileuser',
        element:<ProfileUtilisateur/>
      },
      {
        path:'lois',
        element:<Lois/>
      }, 
      {
        path:'addlaws',
        element:<Addlaws/>
      },
      {
        path:'addscam',
        element:<Addscam/>
      },
      {
        path:'addalerts',
        element:<Submittedalerts/>
      },
      {
        path:'urgence',
        element:<Urgence/>
      },
      {
        path:'messages/:messageId',
        element:<MessageDetail/>
      },
      {
        path:'story/:id',
        element:<StoryDetails/>
      },
      {
        path:'testimonies',
        element:<Testimonies/>,
      },
      {
        path:'fak/:category',
        element:<Fakcat/>
      },
      {
        path:'fak-details/:id',
        element:<Fakdetails/>,
      },
      {
        path:'createfak',
        element:<CreateFak/>,
      },
      {
        path:'service',
        element:<Service/>
      },

      
      // Add more authenticated routes here
    ],
  },
  {
    path:'/cyberambassador',
    element:<Cyberambassador/>,
    children: [
      
     
      
    ]

  },
  {
    path: '*',
    element: <Notfoundview />, // Catch-all route for 404
  },
]);

export default router;
