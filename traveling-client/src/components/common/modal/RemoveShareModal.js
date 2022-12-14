import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { ToastContext } from '../../../App';
function RemoveShareModal ( { data, refresh, setRefresh, setIsShare } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const notify = useContext( ToastContext );

    const handleUnSharePost = async () =>
    {
        await axios.delete( "http://localhost:8080/api/share/delete/" + loginUserId + "/" + data?.postId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
                setIsShare( false );
                notify( res.data, "success" );
            } )
            .catch( ( err ) =>
            {
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    return (
        <div
            className="modal fade create-post-modal"
            id={ "unshare-modal-" + data?.postId }
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
                            Hủy chia sẻ bài viết này
                        </h5>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            <i className="las la-times"></i>
                        </button>
                    </div>
                    <form encType="multipart/form-data">
                        <div className="modal-body">
                            <div className="w-100">
                                <h6 className="text-center pb-3">Bạn muốn hủy chia sẻ bài viết này?</h6>
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
                                    data-toggle="modal" data-target={ "#unshare-modal-" + data?.postId } onClick={ () =>
                                    {
                                        handleUnSharePost();
                                    } }>
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

export default RemoveShareModal