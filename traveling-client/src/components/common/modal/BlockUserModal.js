import axios from 'axios';
import React, { useContext } from 'react'
import { ToastContext } from '../../../App';

function BlockUserModal ( { userData, refresh, setRefresh, setIsBock } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const notify = useContext( ToastContext );

    const handleBlockUser = () =>
    {
        axios.post( "http://localhost:8080/api/block/create", {
            sourceId: loginUserId,
            targetId: userData?.userId
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "token" )
            }
        } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                window.location.reload();
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    return (
        <div
            className="modal fade"
            id={ "block-user-modal-" + userData?.userId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Chặn người dùng này
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
                        <div className="d-flex align-items-center">
                            <p>Họ sẽ không thể nhắn tin và xem nội dung của bạn. Ngược lại, bạn cũng không thể nhắn tin và xem nội dung mà họ đăng tải.</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-secondary mb-3 w-25 mr-2"
                            data-dismiss="modal"
                        >
                            Quay lại
                        </button>
                        <button type="button" className="btn btn-primary mb-3 w-25 ml-2" data-toggle="modal" data-target={ "#block-user-modal-" + userData?.userId }
                            onClick={ () => { handleBlockUser() } }
                        >
                            Xác nhận
                        </button>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default BlockUserModal