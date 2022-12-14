import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function FriendSearchLine ( { userData } )
{
    const [ isFollow, setIsFollow ] = useState( false );
    const currentId = userData?.userId;
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const loginId = JSON.parse( localStorage.getItem( "userData" ) ).userId;
    const [ refresh, setRefresh ] = useState();
    const [ followData, setFollowData ] = useState( false );

    const getFollow = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollow/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                console.log( res.data );
                setFollowData( res.data );
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
            if ( followData[ i ]?.targetId === userData?.userId )
            {
                setIsFollow( true );
            }
        }
    }


    const handleFollow = () =>
    {
        axios.post( "http://localhost:8080/api/follow/create", {
            sourceId: loginId,
            targetId: currentId
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
        axios.delete( "http://localhost:8080/api/follow/delete/" + loginId + "/" + currentId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
                setIsFollow( false );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    useEffect( () =>
    {
        getFollow();
    }, [ refresh ] )


    return (
        <li className="d-flex align-items-center border m-3 p-2">
            <div className="user-img img-fluid">
                <Link to={ "/profile/" + userData?.userId }>
                    <img
                        src={ userData?.avatarSrc }
                        style={ { objectFit: "cover" } }
                        alt="story-img"
                        className="rounded-circle avatar-50"
                    />
                </Link>
            </div>
            <div className="media-support-info ml-3">
                <Link to={ "/profile/" + userData?.userId }><h6 className=" text-primary font-weight-bold">{ userData?.name }</h6></Link>
            </div>
            <div className="d-flex align-items-center">
                <div
                    className="mr-3 btn btn-primary rounded"
                >
                    Nhắn tin
                </div>
                { !isFollow ?
                    <div className="mr-3 btn btn-primary rounded" onClick={ handleFollow }>Theo dõi</div>
                    : <div className="mr-3 btn btn-danger rounded" style={ { width: "130px" } } onClick={ handleUnFollow }>Hủy theo dõi</div> }
            </div>
        </li>
    )
}

export default FriendSearchLine