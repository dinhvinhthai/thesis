import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Verification ()
{
    const [ code, setCode ] = useState();
    const navigate = useNavigate();

    const handleVerify = ( e ) =>
    {
        e.preventDefault();
        axios.post( "http://localhost:8080/api/auth/verify", {
            token: code
        } )
            .then( ( res ) =>
            {
                navigate( "/information" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    return (
        <section className="sign-in-page">
            <div className="container">
                <div className="row h-100">
                    <div className="col-3">
                    </div>
                    <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                        <div className="sign-in-from" style={ { margin: "auto" } }>
                            <h3 className="mb-5 text-center font-weight-bold">Xác thực tài khoản</h3>
                            <p className="text-center">Mã xác thực đã được gửi.<br></br>Vui lòng kiểm tra hộp thư của bạn.</p>
                            <form className="mt-4" onSubmit={ ( e ) => { handleVerify( e ) } }>
                                <div className="form-group d-inline-block w-100">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={ ( e ) => { setCode( e.target.value ) } }
                                        value={ code }
                                        placeholder="Mã xác thực"
                                        required
                                    />
                                </div>
                                <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                    Tiếp tục
                                </button>
                                <div className="sign-info text-center">
                                    <span className="dark-color d-inline-block line-height-2 text-center">
                                        Không nhận được thư? <Link className="font-weight-bold">Gửi lại</Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </div >
        </section>
    )
}

export default Verification