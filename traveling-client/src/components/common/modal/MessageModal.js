import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ChatUser from '../../chat/ChatUser';

function MessageModal ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ chatRoom, setChatRoom ] = useState();

    const handleGetChatUser = () =>
    {
        axios.get( "http://localhost:8080/api/message/getAllChatRoomByUser/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setChatRoom( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };


    useEffect( () =>
    {
        handleGetChatUser();
    }, [] )

    const getFinishMessage = ( list ) =>
    {
        return list[ list?.length - 1 ]
    }

    return (
        <div className="iq-sub-dropdown">
            <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                    <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white">
                            Tin nhắn gần đây
                        </h5>
                    </div>
                    { chatRoom?.length > 0 ? chatRoom?.map( ( data, index ) => (
                        <Link to="/chats">
                            { data?.users?.map( ( user, index ) =>
                            (
                                user?.userId !== loginUserId &&
                                <ChatUser user={ user } message={ getFinishMessage( data?.messages ) } key={ index }></ChatUser>
                            ) ) }
                        </Link>
                    ) ) : <p className="text-center">Không có tin nhắn nào.</p> }

                </div>
            </div>
        </div >
    )
}

export default MessageModal