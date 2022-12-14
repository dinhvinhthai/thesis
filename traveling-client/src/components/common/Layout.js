import React from 'react'
import AdminNavbar from './AdminNavbar';
import Leftbar from './Leftbar'
import Navbar from './Navbar'
import Rightbar from './Rightbar'

function Layout ()
{
    const status = localStorage.getItem( "userStatus" );
    return (
        <>
            { status !== "4" ?
                <>
                    <Navbar></Navbar>
                    <Rightbar></Rightbar>
                </> :
                <AdminNavbar></AdminNavbar> }
            <Leftbar></Leftbar>

        </>
    )
}

export default Layout