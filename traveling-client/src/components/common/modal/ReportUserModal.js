import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ToastContext } from '../../../App';

function ReportUserModal ( { userData } )
{
    const notify = useContext( ToastContext );
    const [ type, setType ] = useState( "0" );
    const [ text, setText ] = useState();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;

    const handleSendReport = () =>
    {
        axios.post( "http://localhost:8080/api/report/create", {
            sourceId: loginUserId,
            targetId: userData?.userId,
            type: type,
            text: text
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
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
            id={ "report-user-modal-" + userData?.userId }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Báo cáo người dùng
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true" onClick={ () => setType( "" ) }>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row form-group d-flex justify-content-center">
                            <h6 className="col-2 mt-auto mb-auto">Lí do:</h6>
                            <select className="form-control col-9"
                                value={ type } onChange={ ( e ) =>
                                {
                                    setType( e.target.value );
                                } }
                                required>
                                <option value="0">Thông tin sai sự thật</option>
                                <option value="1">Thông tin gây hiểu nhầm</option>
                                <option value="2">Lừa đảo</option>
                                <option value="3">Nội dung nhạy cảm</option>
                                <option value="4">Vi phạm pháp luật</option>
                                <option value="5">Khác</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center">
                            <textarea placeholder="Chi tiết vi phạm"
                                className="form-control" rows={ 4 } value={ text }
                                onChange={ ( e ) => { setText( e.target.value ) } }>
                            </textarea>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mb-2 w-25" data-toggle="modal"
                            data-target={ "#report-user-modal-" + userData?.userId } onClick={ () => { handleSendReport() } }>
                            Gửi
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReportUserModal