import axios from 'axios';
import React, { useContext } from 'react'
import { ToastContext } from '../../../App';

function DeleteMessageModal ( { data, refresh, setRefresh } )
{
    const notify = useContext( ToastContext );
    const handleDeleteMessage = () =>
    {
        axios.delete( "http://localhost:8080/api/message/delete/" + data?.messageId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                console.log( refresh );
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
            id={ "delete-message-modal-" + data?.messageId }
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
                            Bạn thật sự muốn xóa tin nhắn này?
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#delete-message-modal-" + data?.messageId }
                            onClick={ () => handleDeleteMessage() }>
                            Chắc chắn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteMessageModal