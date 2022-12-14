import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Register ()
{
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();
    const [ alert, setAlert ] = useState( "" );

    const handleLogin = ( e ) =>
    {
        e.preventDefault();
        setAlert( "" );
        axios.post( "http://localhost:8080/api/auth/login", {
            email,
            password
        } )
            .then( ( res ) =>
            {
                localStorage.setItem( "token", res.data.accessToken );
                localStorage.setItem( "userData", JSON.stringify( res.data ) );
                localStorage.setItem( "userStatus", res.data.status );
                if ( res.data.status === "4" )
                {
                    navigate( "/admin" );
                }
                else
                {
                    navigate( "/" );
                }
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                setAlert( err.response.data );
                setPassword( "" );
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
        <section className="sign-in-page">
            <div className="container">
                <div className="row h-100">
                    <div className="col-3">
                    </div>
                    <div className="col-sm bg-white d-flex" style={ { height: "700px", margin: "auto" } }>
                        <div className="sign-in-from" style={ { margin: "auto" } }>
                            <h3 className="mb-5 text-center font-weight-bold">Đăng nhập</h3>
                            { alert ? <div class="alert alert-danger" role="alert">
                                <div class="iq-alert-text">{ alert }</div>
                            </div> : <></> }
                            <form className="mt-4" onSubmit={ ( e ) => { handleLogin( e ) } }>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control mb-0"
                                        id="email"
                                        onChange={ ( e ) => { setEmail( e.target.value ) } }
                                        value={ email }
                                        required
                                    />
                                </div>
                                <div className="form-group">
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
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1 d-none">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck1"
                                        />
                                        <label className="custom-control-label font-weight-bold" htmlFor="customCheck1">
                                            Lưu email?
                                        </label>
                                    </div>
                                    <div className="custom-control float-right mt-2 pt-1">
                                        <Link to="/forgotPassword" className="font-weight-bold">
                                            Quên mật khẩu
                                        </Link>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                    Đăng nhập ngay
                                </button>
                                <div className="sign-info text-center">
                                    <span className="dark-color d-inline-block line-height-2 text-center">
                                        Chưa có tài khoản ? <Link to="/register" className="font-weight-bold">Đăng kí ngay</Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register