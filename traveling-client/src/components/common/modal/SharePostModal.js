import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as SystemConst from "../../../constant/SystemConst"
import { ToastContext } from '../../../App';
import { useContext } from 'react';

function SharePostModal ( { data, refresh, setRefresh } )
{
    const [ textShare, setTextShare ] = useState();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ status, setStatus ] = useState( SystemConst.POST_STATUS_PUBLIC );
    const notify = useContext( ToastContext );

    const clearInput = () =>
    {
        setStatus( SystemConst.POST_STATUS_PUBLIC );
        setTextShare( "" );
    }

    const handleShare = ( e ) =>
    {
        e.preventDefault();
        axios.post( "http://localhost:8080/api/share/create", {
            userId: loginUserId,
            postId: data?.postId,
            text: textShare,
            status: status
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                handleNotify( data?.userId, SystemConst.NOTIFICATION_SEND_SHARE )
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleNotify = async ( targetId, type ) =>
    {
        if ( targetId == loginUserId )
        {
            return;
        }
        await axios.post( "http://localhost:8080/api/notification/create", {
            sourceId: loginUserId,
            targetId: targetId,
            type: type
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
            } )
            .catch( ( err ) =>
            {
            } );
    };

    return (
        <div
            className="modal fade create-post-modal"
            id={ "share-modal-" + data?.postId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="post-modalLabel"
            aria-hidden="true"
            style={ { border: "none" } }
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="post-modalLabel">
                            Chia sẻ bài viết này
                        </h5>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={ clearInput }
                        >
                            <i className="las la-times"></i>
                        </button>
                    </div>
                    <form encType="multipart/form-data" onSubmit={ ( e ) => handleShare( e ) }>
                        <div className="modal-body">
                            <div className="w-100">
                                <h6 className="text-center p-3">Chia sẻ lại bài viết này trên trang của bạn?</h6>
                                {/* <textarea placeholder="Bạn muốn thêm gì không?" className="form-control" rows={ 5 } value={ textShare } onChange={ ( e ) => { setTextShare( e.target.value ) } }></textarea> */ }
                            </div>
                            <hr />
                            <div className="other-option mb-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center ml-2">
                                        <h6>Ai có thể thấy bài viết tôi chia sẻ?</h6>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                            <span
                                                className="btn dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                            >
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_PUBLIC ? ( "Tất cả mọi người" ) : <></> }</h6>
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_FOLLOW ? ( "Người theo dõi tôi" ) : <></> }</h6>
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_PRIVATE ? ( "Chỉ mình tôi" ) : <></> }</h6>
                                            </span>
                                            <ul className="dropdown-menu">
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_PUBLIC ) } >
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-save-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>Công khai</h6>
                                                            <p className="mb-0">Tất cả mọi người</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_FOLLOW ) }>
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-close-circle-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>Theo dõi tôi</h6>
                                                            <p className="mb-0">Người theo dõi tôi</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_PRIVATE ) }>
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-notification-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>Riêng tư</h6>
                                                            <p className="mb-0">Chỉ mình tôi</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Quay lại
                                </button>
                                <button type='submit'
                                    data-toggle="modal"
                                    data-target={ "#share-modal-" + data?.postId }
                                    className="btn btn-primary d-block">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SharePostModal