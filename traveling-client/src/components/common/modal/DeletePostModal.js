import axios from 'axios';
import React, { useContext } from 'react'
import { ToastContext } from '../../../App';
import * as SystemConst from "../../../constant/SystemConst"

function DeletePostModal ( { data, refresh, setRefresh, reportId } )
{
    const notify = useContext( ToastContext );
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;

    const handleDeletePost = () =>
    {
        axios.delete( "http://localhost:8080/api/post/delete/" + data?.postId,
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
    const handleAdminDeletePost = () =>
    {
        axios.post( "http://localhost:8080/api/post/adminDelete", {
            postId: data?.postId
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
                handleNotify( data?.userId, SystemConst.NOTIFICATION_ADMIN_DELETE );
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
            className="modal fade"
            id={ "delete-post-modal-" + ( reportId ? reportId : data?.postId ) }
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
                            Bạn thật sự muốn xóa bài viết này?
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
                        { reportId ? <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#delete-post-modal-" + reportId } onClick={ () => handleAdminDeletePost() }>
                            Chắc chắn
                        </button> : <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#delete-post-modal-" + data?.postId } onClick={ () => handleDeletePost() }>
                            Chắc chắn
                        </button> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal