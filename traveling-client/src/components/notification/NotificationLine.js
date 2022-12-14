import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import * as SystemConst from "../../constant/SystemConst";
import { ToastContext } from '../../App';
import { Link } from 'react-router-dom';

function NotificationLine ( { data, refresh, setRefresh } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const notify = useContext( ToastContext );
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
            case SystemConst.NOTIFICATION_ADMIN_DELETE:
                return "đã xóa bài viết của bạn vì vi phạm nguyên tắc cộng đồng."
            case SystemConst.NOTIFICATION_ADMIN_UNDO:
                return "đã khôi phục bài viết của bạn."
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

    const handleDeleteNotify = async () =>
    {
        await axios.delete( "http://localhost:8080/api/notification/delete/" + data?.notificationId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    return (
        <div className="iq-card">
            <div className="iq-card-body">
                <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center">
                        <div className="user-img img-fluid">
                            <Link to={ "/profile/" + data?.user?.userId }>
                                <img
                                    src={ data?.user?.avatarSrc }
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                />

                            </Link>
                        </div>
                        <div className="media-support-info ml-3">
                            <h6><Link to={ "/profile/" + data?.user?.userId }>{ data?.user?.name }</Link> { convertNoti( data?.type ) }</h6>
                            <p className="mb-0">{ convertDate( data?.regDate ) }</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                                <div className="btn dropdown-item text-danger" onClick={ () =>
                                {
                                    handleDeleteNotify();
                                } }>
                                    <i className="ri-delete-bin-6-fill mr-2" />
                                    Xóa
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default NotificationLine