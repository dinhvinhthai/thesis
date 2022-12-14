import React from 'react'
import { Link, useParams } from "react-router-dom";

function Leftbar ()
{
    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const userStatus = localStorage.getItem( "userStatus" );
    const params = useParams();
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
                        <li className={ activeLink( "/" ) }>
                            <Link to="/" className="iq-waves-effect">
                                <i className="las la-newspaper" />
                                <span>Khám phá</span>
                            </Link>
                        </li>
                        <li className={ activeLink( "/follows/" + loginId ) }>
                            <Link to={ "/follows/" + loginId } className="iq-waves-effect">
                                <i className="lab la-telegram-plane"></i>
                                <span>Đang theo dõi</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/videos" className="iq-waves-effect">
                                <i className="las la-video" />
                                <span>Video</span>
                            </Link>
                        </li> */}
                        <li className={ activeLink( "/bookmarks" ) }>
                            <Link to="/bookmarks" className="iq-waves-effect">
                                <i className="las la-bookmark"></i>
                                <span>Đánh dấu</span>
                            </Link>
                        </li>
                        <li className={ activeLink( "/friends" ) }>
                            <Link to="/friends/" className="iq-waves-effect">
                                <i className="las la-user-friends" />
                                <span>Bạn bè và Theo dõi</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/groups" className="iq-waves-effect">
                                <i className="las la-users" />
                                <span>Hội nhóm</span>
                            </Link>
                        </li> */}
                        <li className={ activeLink( "/notifications" ) }>
                            <Link to="/notifications" className="iq-waves-effect">
                                <i className="las la-bell" />
                                <span>Thông báo</span>
                            </Link>
                        </li>
                        <li className={ activeLink( "/chats" ) }>
                            <Link to="/chats" className="iq-waves-effect">
                                <i className="lab la-rocketchat" />
                                <span>Tin nhắn</span>
                            </Link>
                        </li>
                        { userStatus === "4" && <li className={ activeLink( "/admins" ) }>
                            <Link to="/admin" className="iq-waves-effect">
                                <i className="las la-user-cog"></i>
                                <span>Admin Management</span>
                            </Link>
                        </li> }

                    </ul>
                </nav>
            </div>
        </div >

    )
}

export default Leftbar