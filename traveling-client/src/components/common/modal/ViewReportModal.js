import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Post from '../Post'
import { ToastContext } from "../../../App"
import { useContext } from 'react';

function ViewReportModal ( { reportData, refresh, setRefresh } )
{
    const navigate = useNavigate();
    const notify = useContext( ToastContext );
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;

    const convertType = ( type ) =>
    {
        switch ( type )
        {
            case "0":
                return "Thông tin sai sự thật";
            case "1":
                return "Thông tin gây hiểu nhầm";
            case "2":
                return "Lừa đảo";
            case "3":
                return "Nội dung nhạy cảm";
            case "4":
                return "Vi phạm pháp luật";
            default:
                return "Khác"
        }
    }

    const handleAdminUndoDeletePost = ( postId ) =>
    {
        axios.post( "http://localhost:8080/api/post/adminUndoDelete", {
            postId: postId
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
            className="modal fade scroller"
            id={ "view-report-modal-" + reportData?.reportId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Nội dung báo cáo
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
                        <form className="form-horizontal px-5 pt-3 scroller">
                            <div className="form-group row pb-2">
                                <label
                                    className="control-label col-sm-3 align-self-center mb-0"
                                    htmlFor="text"
                                >
                                    Lí do:
                                </label>
                                <div className="col-sm-9">
                                    <p className="text-justify mb-0">{ convertType( reportData?.type ) }</p>
                                </div>
                            </div>
                            <div className="form-group row pb-2">
                                <label
                                    className="control-label col-sm-3 align-self-center mb-0"
                                    htmlFor="text"
                                >
                                    Chi tiết
                                </label>
                                <div className="form-check col-sm-9">
                                    <p className="text-justify mb-0">{ reportData?.text }</p>
                                </div>
                            </div>
                            <div className="form-group row pb-2">
                                <label
                                    className="control-label col-sm-3 align-self-center mb-0"
                                    htmlFor="text"
                                >
                                    Người vi phạm
                                </label>
                                <div className="form-check col-sm-9">
                                    <p className="text-left mb-0">
                                        <span className="btn text-danger font-weight-bold m-0 p-0 mr-3" data-dismiss="modal" onClick={ () =>
                                        {
                                            setTimeout( () =>
                                            {
                                                navigate( "/profile/" + reportData?.targetUser?.userId )
                                            }, 500 );
                                        } }>{ reportData?.targetUser?.name }</span></p>
                                </div>
                            </div>
                            <div className="form-group row pb-2">
                                <label
                                    className="control-label col-sm-3 align-self-center mb-0"
                                    htmlFor="text"
                                >
                                    Email
                                </label>
                                <div className="form-check col-sm-9">
                                    <p className="text-justify mb-0">{ reportData?.targetUser?.email }</p>
                                </div>
                            </div>
                        </form>
                        { reportData?.post &&
                            <>
                                { reportData?.post?.isDelete === "0" ? <div className="text-center mb-2" data-toggle="modal" data-target={ "#delete-post-modal-" + reportData?.reportId }>
                                    <div className="btn text-danger">
                                        <i className="ri-delete-bin-line mr-2" />Xóa bài biết vi phạm
                                    </div>
                                </div> : <div className="text-center mb-2" onClick={ () =>
                                {
                                    handleAdminUndoDeletePost( reportData?.post?.postId )
                                } }>
                                    <div className="btn text-primary">
                                        <i className="las la-undo-alt mr-2"></i>Khôi phục bài viết
                                    </div>
                                </div> }
                                { reportData?.post?.isDelete !== "1" ?
                                    <div className="row">
                                        <div className="col-lg-8 mx-auto">
                                            { reportData?.post &&
                                                <Post data={ reportData?.post } reportId={ reportData?.reportId } />
                                            }
                                        </div>
                                    </div> :
                                    <div className="row" style={ { opacity: '0.5', pointerEvents: 'none' } }>
                                        <div className="col-lg-8 mx-auto">
                                            { reportData?.post &&
                                                <Post data={ reportData?.post } reportId={ reportData?.reportId } />
                                            }
                                        </div>
                                    </div> }

                            </> }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewReportModal