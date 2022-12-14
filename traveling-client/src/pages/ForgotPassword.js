import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContext } from '../App';


function ForgotPassword ()
{
    const [ email, setEmail ] = useState();
    const [ hideForm, setHideForm ] = useState( true );
    const [ code, setCode ] = useState();
    const [ alert, setAlert ] = useState( "" );
    const navigate = useNavigate();
    const notify = useContext( ToastContext );
    const handleForgotPassword = ( e ) =>
    {
        e.preventDefault();
        notify( "Vui lòng chờ trong giây lát...", "success" );
        axios.post( "http://localhost:8080/api/auth/forgotPassword/" + email )
            .then( ( res ) =>
            {
                localStorage.setItem( "email", email );
                setHideForm( !hideForm );
            } )
            .catch( ( err ) =>
            {
                setAlert( err.response.data );
                console.log( err.response );
            } );
    };

    const handleVerify = ( e ) =>
    {
        e.preventDefault();
        axios.post( "http://localhost:8080/api/auth/verifyPassword", {
            token: code
        } )
            .then( ( res ) =>
            {
                navigate( "/changePassword" )
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    return (
        <React.Fragment>
            { hideForm ? ( <section className="sign-in-page">
                <div className="container">
                    <div className="row h-100">
                        <div className="col-3">
                        </div>
                        <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                            <div className="sign-in-from" style={ { margin: "auto" } }>
                                <h3 className="mb-5 text-center font-weight-bold">Tìm lại mật khẩu</h3>
                                { alert ? <div class="alert alert-danger" role="alert">
                                    <div class="iq-alert-text">{ alert }</div>
                                </div> : <></> }
                                <form className="mt-4" onSubmit={ ( e ) => { handleForgotPassword( e ) } }>
                                    <div className="form-group d-inline-block w-100  mx-auto">
                                        <label htmlFor="email" className="text-center mb-3 w-100">Vui lòng nhập email của bạn tại đây:</label>
                                        <input
                                            type="email"
                                            className="form-control mb-0 w-75 mx-auto"
                                            id="email"
                                            onChange={ ( e ) => { setEmail( e.target.value ) } }
                                            value={ email }
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                        Nhận mã xác thực
                                    </button>
                                    <div className="sign-info text-center">
                                        <span className="dark-color d-inline-block line-height-2 text-center">
                                            Quay lại? <Link to="/login" className="font-weight-bold">Đăng nhập</Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                </div >
            </section > ) : ( <section className="sign-in-page">
                <div className="container">
                    <div className="row h-100">
                        <div className="col-3">
                        </div>
                        <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                            <div className="sign-in-from" style={ { margin: "auto" } }>
                                <h3 className="mb-5 text-center font-weight-bold">Xác thực thông tin</h3>
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
            </section> ) }
        </React.Fragment>

    )
}

export default ForgotPassword