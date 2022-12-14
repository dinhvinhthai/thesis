import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

function Rightbar ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ friendData, setFriendData ] = useState();
    const handleGetFriend = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFriendById/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setFriendData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetFriend()
    }, [ 0 ] )


    return (
        <div className="right-sidebar-mini">
            <div className="right-sidebar-panel p-0">
                <div className="iq-card shadow-none">
                    <div className="iq-card-body p-0">
                        <div className="media-height p-3">
                            <h4 className='text-dark mb-3'>Bạn bè</h4>
                            {/* <div className="chat-searchbar mt-4">
                                <div className="form-group chat-search-data m-0">
                                    <input
                                        type="text"
                                        className="form-control round"
                                        id="chat-search"
                                        placeholder="Tìm kiếm..."
                                    />
                                    <i className="ri-search-line" />
                                </div>
                            </div> */}
                            { friendData?.length > 0 ? friendData?.map( ( friend, index ) => (
                                <Link to={ "/profile/" + friend?.userId } className="media align-items-center mb-4" key={ index }>
                                    <div className="iq-profile-avatar">
                                        <img
                                            className="rounded-circle avatar-50"
                                            src={ friend?.avatarSrc }
                                            alt="friend-avatar"
                                        />
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0">
                                            { friend?.name }
                                        </h6>
                                        <p className="mb-0">{ friend?.isOnline }</p>
                                    </div>
                                </Link>
                            ) ) : <p>Hãy theo dõi ai đó đi nào!</p> }
                        </div>
                        {/* <div className="right-sidebar-toggle bg-primary mt-3">
                            <i className="ri-arrow-left-line side-left-icon" />
                            <i className="ri-arrow-right-line side-right-icon">
                                <span className="ml-3 d-inline-block">Close Menu</span>
                            </i>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Rightbar