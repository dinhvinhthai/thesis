import React from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import ChatSearch from './ChatSearch'

function ChatBlock ()
{
    return (
        <div className="iq-card">
            <div className="iq-card-body chat-page p-0">
                <div className="chat-data-block">
                    <div className="row">
                        <div className="col-lg-3 chat-data-left scroller">
                            <ChatSearch></ChatSearch>
                            <ChatList></ChatList>
                        </div>
                        <div className="col-lg-9 chat-data p-0 chat-data-right">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="default-block" role="tabpanel">
                                    <div className="chat-start">
                                        <span className="iq-start-icon text-primary">
                                            <i className="ri-message-3-line" />
                                        </span>

                                    </div>
                                </div>
                                <ChatBox></ChatBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBlock