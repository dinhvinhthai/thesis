import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChatUser from './ChatUser'

function ChatList ( { chatData } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const getFinishMessage = ( list ) =>
    {
        return list[ list?.length - 1 ]
    }

    return (
        <div className="chat-sidebar-channel scroller mt-4 pl-3">
            <h5 className="">Gần nhất</h5>
            <ul className="iq-chat-ui nav flex-column nav-pills">
                { chatData?.map( ( data, index ) => (
                    <>
                        { data?.users?.map( ( user, index ) =>
                        (
                            user?.userId !== loginUserId && 
                            <ChatUser user={ user } message={ getFinishMessage( data?.messages ) } key={ index }></ChatUser>
                        ) ) }
                    </>
                ) ) }
            </ul>
        </div>
    )
}

export default ChatList