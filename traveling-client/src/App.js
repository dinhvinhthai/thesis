import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Notification from './pages/Notification';
import YourGroup from './pages/YourGroup';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import Information from './pages/Information';
import Video from './pages/Video';
import React, { createContext } from 'react';
import Verification from './pages/Verification';
import Follow from './pages/Follow';
import Bookmark from './pages/Bookmark';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import PasswordVerify from './pages/PasswordVerify';
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import Setting from "./pages/Setting";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminReportManagement from "./pages/AdminReportManagement";

export const ToastContext = createContext();

function App ()
{
  const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
  const notify = ( text, status ) =>
  {
    switch ( true )
    {
      case status === "success":
        return toast.success( text );
      case status === "fail":
        return toast.error( text );
      default:
        return toast( text );

    }
  }


  // const handleUpdateIsOnline = () =>
  // {
  //   if ( !localStorage.getItem( "visited" ) )
  //   {
  //     axios.post( "http://localhost:8080/api/user/updateIsOnline", {
  //       userId: loginId
  //     },
  //       {
  //         headers: {
  //           "Authorization": "Bearer " + localStorage.getItem( "token" )
  //         }
  //       } )
  //       .then( ( res ) =>
  //       {
  //         localStorage.setItem( 'visited', true );
  //       } )
  //       .catch( ( err ) =>
  //       {
  //         console.log( err.response );
  //       } );
  //   }

  // };

  // const handleUpdateIsOffline = () =>
  // {
  //   if ( !sessionStorage.getItem( 'reloaded' ) )
  //   {
  //     axios.post( "http://localhost:8080/api/user/updateIsOffline", {
  //       userId: loginId
  //     },
  //       {
  //         headers: {
  //           "Authorization": "Bearer " + localStorage.getItem( "token" )
  //         }
  //       } )
  //       .then( ( res ) =>
  //       {
  //         localStorage.setItem( 'visited', false );
  //       } )
  //       .catch( ( err ) =>
  //       {
  //         console.log( err.response );
  //       } );
  //   }
  // };

  // const handleTabClose = ( e ) =>
  // {
  //   e.preventDefault();
  //   return handleUpdateIsOffline();
  // };

  // const handleTabOpen = ( e ) =>
  // {
  //   e.preventDefault();
  //   return handleUpdateIsOnline();
  // };

  // useEffect( () =>
  // {
  //   window.addEventListener( "load", handleTabOpen );
  //   window.addEventListener( 'beforeunload', handleTabClose );
  //   window.addEventListener( 'keydown', handleRefresh );

  //   return () =>
  //   {
  //     sessionStorage.setItem( 'reloaded', false );
  //     window.removeEventListener( "load", handleTabOpen );
  //     window.removeEventListener( 'beforeunload', handleTabClose );
  //   };
  // }, [] );


  return (
    <ToastContext.Provider value={ notify }>
      <div className="wrapper">
        <Routes>
          <Route exact path="/register" element={ <Register /> } />
          <Route path="/register/verify" element={ <Verification /> } />
          <Route path="/information" element={ <Information /> } />
          <Route exact path="/forgotPassword" element={ <ForgotPassword /> } />
          <Route path="/forgotPassword/verify" element={ <PasswordVerify /> } />
          <Route path="/changePassword" element={ <ChangePassword /> } />
          <Route path="/login" element={ <Login /> } />
          <Route exact path="/" element={ <Home /> } />
          <Route path="/search/:keyword" element={ <Search /> } />
          <Route path="/profile/:userId" element={ <Profile /> } />
          <Route path="/friends" element={ <Friends /> } />
          <Route path="/notifications" element={ <Notification /> } />
          <Route path="/follows/:userId" element={ <Follow /> } />
          <Route path="/bookmarks" element={ <Bookmark /> } />
          <Route path="/videos" element={ <Video /> } />
          <Route path="/groups" element={ <YourGroup /> } />
          <Route path="/chats" element={ <Chat /> } />
          <Route path="/settings" element={ <Setting /> } />
          <Route path="/admin" element={ <AdminDashboard /> } />
          <Route path="/admin/user" element={ <AdminUserManagement /> } />
          <Route path="/admin/report" element={ <AdminReportManagement /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={ 1000 }
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
