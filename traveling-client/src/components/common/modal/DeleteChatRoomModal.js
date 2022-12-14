import axios from 'axios';
import React, { useContext } from 'react'
import { ToastContext } from '../../../App';

function DeleteChatRoomModal ( { data, refresh, setRefresh } )
{
    const notify = useContext( ToastContext );
    const handleDeleteChatRoom = () =>
    {
        axios.delete( "http://localhost:8080/api/message/deleteChatRoom/" + data?.chatRoomId,
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
            id={ "delete-chatroom-modal-" + data?.chatRoomId }
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
                            Bạn thật sự muốn hộp thoại này?
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#delete-chatroom-modal-" + data?.chatRoomId }
                            onClick={ () => handleDeleteChatRoom() }>
                            Chắc chắn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteChatRoomModal