import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function FriendBlock ( { userData, refresh, setRefresh } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) ).userId;
    const [ isFollow, setIsFollow ] = useState( false );
    const handleUnFollow = () =>
    {
        axios.delete( "http://localhost:8080/api/follow/delete/" + loginUserId + "/" + userData?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    return (
        <div className="iq-friendlist-block">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <Link to={ "/profile/" + userData?.userId }>
                        <img
                            src={ userData?.avatarSrc }
                            style={ {
                                width: "150px",
                                height: "150px",
                                objectFit: "cover"
                            } }
                            alt="profile-img"
                            className="img-fluid"
                        />
                    </Link>
                    <div className="friend-info ml-3">
                        <Link to={ "/profile/" + userData?.userId }>
                            <h5>{ userData?.name }</h5>
                        </Link>
                    </div>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                    <div className="dropdown">
                        { isFollow ? <span
                            className="btn btn-primary mr-2"
                            aria-expanded="true"
                            role="button" onClick={ () =>
                            {
                                handleUnFollow()
                            } }
                        >
                            Theo dõi lại
                        </span> : <span
                            className="btn btn-secondary mr-2"
                            aria-expanded="true"
                            role="button" onClick={ () =>
                            {
                                handleUnFollow()
                            } }
                        >
                            Hủy theo dõi
                        </span> }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendBlock