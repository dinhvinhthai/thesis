import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContext } from '../App';

function Register ()
{
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ code, setCode ] = useState();
    const [ passwordConfirm, setPasswordConfirm ] = useState();
    const [ hideForm, setHideForm ] = useState( true );
    const navigate = useNavigate();
    const notify = useContext( ToastContext );
    const [ alert, setAlert ] = useState( "" );

    const handleRegister = async ( e ) =>
    {
        e.preventDefault();
        setAlert( "" );
        if ( password !== passwordConfirm )
        {
            setAlert( "Nhập lại mật khẩu không chính xác." );
        }
        else if ( password.length < 8 || !password.match( /[A-Z]+/ ) || !password.match( /[0-9]+/ ) || !password.match( /[$@#&!]+/ ) )
        {
            setAlert( "Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự in hoa và 1 kí tự đặc biệt." );
        }
        else
        {
            notify( "Vui lòng chờ trong giây lát...", "success" );
            await axios.post( "http://localhost:8080/api/auth/register", {
                email,
                password
            } )
                .then( ( res ) =>
                {
                    setHideForm( !hideForm );
                    setAlert( "" );
                } )
                .catch( ( err ) =>
                {
                    setAlert( err.response.data );
                    setPassword( "" );
                    setPasswordConfirm( "" );
                } );
        }
    };

    const handleVerify = async ( e ) =>
    {
        e.preventDefault();
        await axios.post( "http://localhost:8080/api/auth/verify", {
            token: code
        } )
            .then( ( res ) =>
            {
                localStorage.setItem( "email", email );
                notify( "Đăng ký thành công.", "success" );
                navigate( "/information" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        if ( localStorage.getItem( "token" ) != null )
        {
            navigate( "/" );
        }
    } )


    return (
        <React.Fragment>
            { hideForm ? ( <section className="sign-in-page">
                <div className="container">
                    <div className="row h-100">
                        <div className="col-3">
                        </div>
                        <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                            <div className="sign-in-from" style={ { margin: "auto" } }>
                                <h3 className="mb-5 text-center font-weight-bold">Đăng ký</h3>
                                { alert ? <div class="alert alert-danger" role="alert">
                                    <div class="iq-alert-text">{ alert }</div>
                                </div> : <></> }
                                <form className="mt-4" onSubmit={ ( e ) => { handleRegister( e ) } }>
                                    <div className="form-group d-inline-block w-100">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            onChange={ ( e ) => { setEmail( e.target.value ) } }
                                            value={ email }
                                            required
                                        />
                                    </div>
                                    <div className="form-group d-inline-block w-100">
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input
                                            type="password"
                                            className="form-control mb-0"
                                            id="password"
                                            onChange={ ( e ) => { setPassword( e.target.value ) } }
                                            value={ password }
                                            required
                                        />
                                    </div>
                                    <div className="form-group d-inline-block w-100">
                                        <label htmlFor="passwordConfirm">Nhập lại mật khẩu</label>
                                        <input
                                            type="password"
                                            className="form-control mb-0"
                                            id="passwordConfirm"
                                            onChange={ ( e ) => { setPasswordConfirm( e.target.value ) } }
                                            value={ passwordConfirm }
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                        Tiếp tục
                                    </button>
                                    <div className="sign-info text-center">
                                        <span className="dark-color d-inline-block line-height-2 text-center">
                                            Đã có tài khoản ? <Link to="/login" className="font-weight-bold">Đăng nhập ngay</Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                </div >
            </section> ) : ( <section className="sign-in-page">
                <div className="container">
                    <div className="row h-100">
                        <div className="col-3">
                        </div>
                        <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                            <div className="sign-in-from" style={ { margin: "auto" } }>
                                <h3 className="mb-5 text-center font-weight-bold">Xác thực tài khoản</h3>
                                <p className="text-center">Mã xác thực đã được gửi. <br></br>Vui lòng kiểm tra hộp thư của bạn.</p>
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

export default Register