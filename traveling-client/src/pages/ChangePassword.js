import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ChangePassword ()
{
    const [ newPassword, setNewPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const email = localStorage.getItem( "email" );
    const [ alert, setAlert ] = useState( "" );
    const navigate = useNavigate();
    const changePassword = ( e ) =>
    {
        setAlert( "" );
        e.preventDefault();
        if ( confirmPassword !== newPassword )
        {
            setAlert( "Nhập lại mật khẩu chưa chính xác." )
        }
        var password = [ newPassword ];
        axios.post( "http://localhost:8080/api/auth/newPassword/" + email,
            password
        )
            .then( ( res ) =>
            {
                navigate( "/login" );
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
                            <h3 className="mb-5 text-center font-weight-bold">Tạo lại mật khẩu</h3>
                            { alert ? <div class="alert alert-danger" role="alert">
                                <div class="iq-alert-text">{ alert }</div>
                            </div> : <></> }
                            <form className="mt-4" onSubmit={ ( e ) => changePassword( e ) }>
                                <div className="form-group">
                                    <label htmlFor="email">Mật khẩu mới</label>
                                    <input
                                        type="password"
                                        className="form-control mb-0"
                                        id="password"
                                        onChange={ ( e ) => { setNewPassword( e.target.value ) } }
                                        value={ newPassword }
                                        required
                                    />
                                </div>
                                <div className="form-group d-inline-block w-100">
                                    <label htmlFor="password">Nhập lại mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control mb-0"
                                        id="confirmPassword"
                                        onChange={ ( e ) => { setConfirmPassword( e.target.value ) } }
                                        value={ confirmPassword }
                                        required
                                    />
                                </div>
                                <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                    Xác nhận
                                </button>
                                {/* <div className="sign-info text-center">
                                    <span className="dark-color d-inline-block line-height-2 text-center">
                                        Chưa có tài khoản ? <Link to="/register" className="font-weight-bold">Đăng kí ngay</Link>
                                    </span>
                                </div> */}
                            </form>
                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </div >
        </section >
    )
}

export default ChangePassword