import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatBox from '../components/chat/ChatBox'
import ChatList from '../components/chat/ChatList'
import ChatSearch from '../components/chat/ChatSearch'
import Layout from '../components/common/Layout'

function Chat ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ chatRoom, setChatRoom ] = useState();
    const [ refresh, setRefresh ] = useState( false );
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
        const interval = setInterval( () =>
        {
            handleGetChatUser();
        }, 500 );
        return () => clearInterval( interval )
    } );

    // useEffect( () =>
    // {
    //     handleGetChatUser();
    // }, [ refresh ] )

    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-body chat-page p-0">
                                    <div className="chat-data-block">
                                        <div className="row">
                                            <div className="col-lg-3 chat-data-left">
                                                {/* <ChatSearch></ChatSearch> */ }
                                                <ChatList chatData={ chatRoom }></ChatList>
                                            </div>
                                            <div className="col-lg-9 chat-data p-0 chat-data-right">
                                                <div className="tab-content">
                                                    {/* <div className="tab-pane fade active show" id="default-block" role="tabpanel">
                                                        <div className="chat-start">
                                                            <span className="iq-start-icon text-primary">
                                                                <i className="ri-message-3-line" />
                                                            </span>

                                                        </div>
                                                    </div> */}
                                                    { chatRoom?.map( ( data, index ) => (
                                                        <ChatBox data={ data } key={ index } refresh={ refresh } setRefresh={ setRefresh }></ChatBox>
                                                    ) ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Chat