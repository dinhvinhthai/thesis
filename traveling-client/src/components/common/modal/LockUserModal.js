import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { ToastContext } from "../../../App"

function LockUserModal ( { type, data, refresh, setRefresh } )
{
    const notify = useContext( ToastContext );
    const handleLockUser = () =>
    {
        axios.post( "http://localhost:8080/api/user/lockUser", {
            userId: data?.userId
        },
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
                console.log( err.response );
            } );
    };

    const handleUnLockUser = () =>
    {
        axios.post( "http://localhost:8080/api/user/unlockUser", {
            userId: data?.userId
        },
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
                console.log( err.response );
            } );
    };

    return (
        <div
            className="modal fade"
            id={ "lock-user-modal-" + data?.userId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Xác nhận
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
                        <h6 className="text-center p-3">
                            Bạn thật sự muốn { type === "lock" ? "khóa" : "mở khóa" } người dùng này?
                        </h6>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Quay lại
                        </button>
                        { type === "lock" ? <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#lock-user-modal-" + data?.userId }
                            onClick={ () => handleLockUser() }>
                            Chắc chắn
                        </button> : <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#lock-user-modal-" + data?.userId }
                            onClick={ () => handleUnLockUser() }>
                            Chắc chắn
                        </button> }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockUserModal