import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageModal from './modal/MessageModal'
import NotificationModal from './modal/NotificationModal'
import OptionModal from './modal/OptionModal'

function Navbar ()
{
    const userData = JSON.parse( localStorage.getItem( "userData" ) );
    const [ keyword, setKeyword ] = useState( "" );
    const navigate = useNavigate();

    return (
        <div className="iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="row navbar navbar-expand-lg navbar-light p-0">
                    <div className="col-4 iq-navbar-logo d-flex">
                        <Link to="/">
                            <h3 className="ml-4 text-primary font-weight-bold">Traveling</h3>
                        </Link>
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle">
                                    <i className="ri-menu-line" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 iq-search-bar">
                        <form className="searchbox  mx-auto" onSubmit={ ( e ) => e.preventDefault() }>
                            <input
                                type="text"
                                className="text search-input "
                                placeholder="Thử tìm kiếm gì đó..."
                                onChange={ ( e ) => { setKeyword( e.target.value ) } }
                                value={ keyword }
                                required
                                onKeyPress={ event =>
                                {
                                    if ( event.key === 'Enter' )
                                    {
                                        navigate( "/search/" + keyword );
                                    }
                                } }
                            />
                            <Link to={ "/search/" + keyword } className="search-link">
                                <i className="btn ri-search-line text-primary mr-1" />
                            </Link>
                        </form>
                    </div>
                    <div className="col-4 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-list">
                            <li>
                                <Link
                                    to={ "/profile/" + userData?.userId }
                                    className="iq-waves-effect d-flex align-items-center"
                                >
                                    <img
                                        src={ userData?.avatarUrl }
                                        className="img-fluid rounded-circle mr-3"
                                        alt="user"
                                    />
                                    <div className="caption">
                                        <h6 className="mb-0">{ userData?.name }</h6>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="search-toggle iq-waves-effect">
                                    <i className="ri-notification-3-line"></i>
                                    <span className="bg-danger dots" />
                                </Link>
                                <NotificationModal></NotificationModal>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="search-toggle iq-waves-effect">
                                    <i className="ri-chat-3-line"></i>
                                    <span className="bg-primary dots" />
                                </Link>
                                <MessageModal></MessageModal>
                            </li>
                        </ul>
                        <ul className="navbar-list">
                            <li>
                                <div className="btn search-toggle iq-waves-effect d-flex align-items-center">
                                    <i className="ri-arrow-down-s-fill" />
                                </div>
                                <OptionModal></OptionModal>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>


    )
}

export default Navbar