import axios from 'axios';
import React, { useContext, useState } from 'react'
import * as SystemConst from "../../../constant/SystemConst";
import { ToastContext } from '../../../App';

function ChangeStatusPostModal ( { data, refresh, setRefresh } )
{
    const [ status, setStatus ] = useState( data?.status );
    const notify = useContext( ToastContext );

    const handleChangStatus = () =>
    {
        axios.post( "http://localhost:8080/api/post/updateStatus/" + data?.postId, {
            status
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
                notify( res.data, "success" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    return (
        <div
            className="modal fade"
            id={ "change-post-modal-" + data?.postId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Chỉnh sửa trạng thái bài viết
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="other-option">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center ml-2">
                                    <h6>Ai có thể thấy bài viết này?</h6>
                                </div>
                                <div className="iq-card-post-toolbar">
                                    <div className="dropdown">
                                        <span
                                            className="dropdown-toggle"
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
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Quay lại
                        </button>
                        <button type="button" className="btn btn-primary"
                            data-toggle="modal" data-target={ "#change-post-modal-" + data?.postId } onClick={ () =>
                            {
                                handleChangStatus();
                            } }>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeStatusPostModal