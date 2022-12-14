import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { ToastContext } from "../../../App"

function DeleteReportModal ( { reportData, refresh, setRefresh } )
{
    const notify = useContext( ToastContext );

    const handleDeleteReport = () =>
    {
        axios.delete( "http://localhost:8080/api/report/delete/" + reportData?.reportId,
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
            id={ "delete-report-modal-" + reportData?.reportId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle" >
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
                            Bạn thật sự muốn xóa báo cáo này?
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
                        <button type="button" className="btn btn-primary" data-toggle="modal"
                            data-target={ "#delete-report-modal-" + reportData?.reportId }
                            onClick={ () => handleDeleteReport() }>
                            Chắc chắn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DeleteReportModal