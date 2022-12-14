import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function FollowMe ( { userData, refresh, setRefresh } )
{
    console.log( userData );
    const [ isFollow, setIsFollow ] = useState( false );
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) ).userId;

    const handleFollow = () =>
    {
        axios.post( "http://localhost:8080/api/follow/create", {
            sourceId: loginUserId,
            targetId: userData?.userId
        },
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
    };

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

    const getFollowingById = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollowingById/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                isLoginFollow( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    const isLoginFollow = ( followData ) =>
    {
        for ( var i = 0; i < followData?.length; i++ )
        {
            if ( followData[ i ]?.userId === userData?.userId )
            {
                setIsFollow( true );
            }
        }
    }
    console.log( isFollow );


    useEffect( () =>
    {
        getFollowingById();
    }, [ refresh ] );

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
                        { isFollow === true ? <span
                            className="btn btn-secondary mr-2"
                            aria-expanded="true"
                            role="button"
                            onClick={ () =>
                            {
                                handleUnFollow();
                            } }
                        >
                            Hủy theo dõi
                        </span> : <span
                            className="btn btn-primary mr-2"
                            aria-expanded="true"
                            role="button"
                            onClick={ () =>
                            {
                                handleFollow();
                            } }
                        >
                            Theo dõi lại
                        </span> }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowMe