import React from 'react'
import { Link } from 'react-router-dom'

function AdminSidebar ()
{
    const activeLink = ( link ) =>
    {
        if ( link === window.location.pathname )
        {
            return "active"
        }

    }

    return (
        <div className="iq-sidebar">
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className={ activeLink( "/admin" ) }>
                            <Link to="/admin" className="iq-waves-effect">
                                <i className="las la-newspaper" />
                                <span>Thống kê</span>
                            </Link>
                        </li>

                        <li className={ activeLink( "/admin/user" ) }>
                            <Link to="/admin/user" className="iq-waves-effect">
                                <i className="las la-user-friends" />
                                <span>Quản lí người dùng</span>
                            </Link>
                        </li>
                        <li className={ activeLink( "/admin/report" ) }>
                            <Link to="/admin/report" className="iq-waves-effect">
                                <i className="las la-bookmark"></i>
                                <span>Quản lí báo cáo</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="iq-waves-effect">
                                <i className="las la-home"></i>
                                <span>Khám phá</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default AdminSidebar