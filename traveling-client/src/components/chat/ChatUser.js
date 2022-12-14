import React from 'react'
import { Link } from 'react-router-dom';

function ChatUser ( { user, message } )
{
    const convertDate = ( time ) =>
    {
        time = new Date( time );
        return time.getHours() + ":" + time.getMinutes() + " " + time.toLocaleDateString( 'en-GB' );
    }

    const convertMessage = ( message ) =>
    {
        switch ( true )
        {
            case message?.image != null:
                return "Đã gửi một ảnh.";
            case message?.video != null:
                return "Đã gửi một video.";
            default:
                return message?.text;
        }
    }

    return (
        <li data-toggle="pill" data-target={ "#chatbox-" + user?.userId } className="btn text-left p-0 m-0">
            <div className="d-flex align-items-center">
                <div className="avatar m-2">
                    <img
                        src={ user?.avatarSrc }
                        alt="chat-user-img"
                        className="avatar-50 "
                    />
                </div>
                <div className="chat-sidebar-name">
                    <h6 className="mb-0">{ user?.name }</h6>
                    <span>{ convertMessage( message ) }</span>
                </div>
                <div className="chat-meta float-right text-center mt-2 mr-1">
                    {/* <div className="chat-msg-counter bg-primary text-white">
                            3
                        </div> */}
                    {/* <span>{ convertDate( message?.regDate ) }</span> */ }
                </div>
            </div>
        </li>
    )
}

export default ChatUser