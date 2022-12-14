import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import * as SystemConst from "../../../constant/SystemConst";

function NotificationModal ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ notify, setNotify ] = useState();

    const handleGetNotification = () =>
    {
        axios.get( "http://localhost:8080/api/notification/getAllByUserId/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.regDate - a.regDate );
                setNotify( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const convertNoti = ( type ) =>
    {
        switch ( type )
        {
            case SystemConst.NOTIFICATION_CREATE_POST:
                return "đã đăng bài viết mới.";
            case SystemConst.NOTIFICATION_SEND_LIKE_POST:
                return "đã yêu thích bài viết của bạn.";
            case SystemConst.NOTIFICATION_SEND_LIKE_COMMENT:
                return "đã yêu thích bình luận của bạn.";
            case SystemConst.NOTIFICATION_SEND_COMMENT:
                return "đã bình luận vào bài viết của bạn.";
            case SystemConst.NOTIFICATION_SEND_FOLLOW:
                return "đã theo dõi bạn.";
            case SystemConst.NOTIFICATION_SEND_SHARE:
                return "đã chia sẻ bài viết của bạn.";
            case SystemConst.NOTIFICATION_SEND_MESSAGE:
                return "đã gửi một tin nhắn cho bạn.";
            default:
                return "";
        }
    }

    const convertDate = ( time ) =>
    {
        var date = Math.round( ( Date.now() - new Date( time ) ) / 1000 );
        switch ( true )
        {
            case date < 60:
                return date + " giây trước";
            case ( date > 60 && date < ( 60 * 60 ) ):
                return Math.round( date / 60 ) + " phút trước";
            case ( date > ( 60 * 60 ) && date < ( 60 * 60 * 24 ) ):
                return Math.round( date / ( 60 * 60 ) ) + " giờ trước";
            default:
                return new Date( time ).toLocaleDateString( 'en-GB' );
        }
    }

    useEffect( () =>
    {
        handleGetNotification();
    }, [] )

    return (
        <div className="iq-sub-dropdown">
            <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                    <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white">
                            Thông báo gần đây
                        </h5>
                    </div>
                    { notify?.length > 0 ? notify?.map( ( data, index ) => (
                        index < 3 &&
                        <div className="iq-sub-card">
                            <div className="media align-items-center">
                                <div className="">
                                    <img
                                        className="avatar-40 rounded"
                                        src={ data?.user?.avatarSrc }
                                        alt=""
                                    />
                                </div>
                                <div className="media-body ml-3">
                                    <h6 className="mb-0 ">{ data.user?.name } { convertNoti( data?.type ) }</h6>
                                    <small className="float-right font-size-12">
                                        { convertDate( data?.regDate ) }
                                    </small>
                                </div>
                            </div>
                        </div>
                    ) ) : <p className="text-center">Không có thông báo nào.</p> }
                    { notify?.length > 0 && <div className="p-2">
                        <Link to="/notifications" className="btn btn-primary d-block w-50 mx-auto">Xem thêm</Link>
                    </div> }

                </div>
            </div>
        </div>
    )
}

export default NotificationModal