import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function EditIntroModal ( userData, refresh, setRefresh )
{
    const [ intro, setIntro ] = useState();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;

    const updateIntroduce = () =>
    {
        axios.post( "http://localhost:8080/api/user/updateIntroduce/" + loginUserId,
            ( intro ),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                window.location.reload();
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };
    console.log();
    return (
        <div
            className="modal fade"
            id={ "edit-introduce-modal" }
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            Giới thiệu
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true" onClick={ () => setIntro( "" ) }>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex align-items-center">
                            <textarea placeholder="Hãy viết gì đó về bạn"
                                className="form-control" rows={ 4 } value={ userData?.userData?.introduce && intro }
                                onChange={ ( e ) => { setIntro( e.target.value ) } }></textarea>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary mb-2 w-25" data-toggle="modal" data-target="#edit-introduce-modal"
                            onClick={ () =>
                            {
                                updateIntroduce();
                            } }>
                            Đăng
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditIntroModal