import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Information ()
{
    const [ name, setName ] = useState();
    const [ gender, setGender ] = useState( "0" );
    const [ birthday, setBirthday ] = useState();
    const [ avatarFile, setAvatarFile ] = useState();
    const inputRefAvatar = React.useRef();
    const [ source, setSource ] = useState( "" );
    const email = localStorage.getItem( "email" );
    const navigate = useNavigate();

    const handleChooseImage = ( e ) =>
    {
        inputRefAvatar.current.click();
    };

    const handleAvatarChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setAvatarFile( file );
        var url = URL.createObjectURL( file );
        setSource( url );
    };

    const handleCreateProfile = ( e ) =>
    {
        e.preventDefault();
        let userData = {
            "email": email,
            "name": name,
            "gender": gender,
            "birthday": birthday
        };
        let jsonBlob = ( obj ) =>
        {
            return new Blob( [ JSON.stringify( obj ) ], {
                type: "application/json",
            } );
        };
        let formData = new FormData();
        formData.append( "user", jsonBlob( userData ) );
        formData.append( "file", avatarFile );
        axios.post( "http://localhost:8080/api/auth/createProfile", formData,
            {
                headers: {
                    'Accept': 'application/json ,text/plain, */*',
                    'Content-Type': 'multipart/form-data'
                }
            } )
            .then( ( res ) =>
            {
                localStorage.removeItem( "email" );
                navigate( "/login" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        if ( !email )
        {
            navigate( "/register" );
        }
    }, [] )

    useEffect( () =>
    {
        if ( localStorage.getItem( "token" ) != null )
        {
            navigate( "/" );
        }
    } )

    return (
        <section className="sign-in-page">
            <div className="container p-0">
                <div className="row h-100">
                    <div className="col-3">
                    </div>
                    <div className="col-sm bg-white d-flex h-100">
                        <div className="sign-in-from" style={ { margin: "auto" } }>
                            <h3 className="mb-5 text-center font-weight-bold">Nhập thông tin</h3>
                            <form className="mt-4" encType="multipart/form-data" onSubmit={ ( e ) => handleCreateProfile( e ) }>
                                <input
                                    ref={ inputRefAvatar }
                                    className="d-none"
                                    type="file"
                                    accept="image/*"
                                    onChange={ handleAvatarChange }
                                />
                                <div className="user-detail text-center mb-3">
                                    <div className="profile-img" onClick={ handleChooseImage }>
                                        { source ? (
                                            <img
                                                src={ source }
                                                style={ {
                                                    height: "130px",
                                                    objectFit: "cover",
                                                    cursor: "pointer"
                                                } }
                                                alt="profile-img"
                                                className="avatar-130 img-fluid"
                                            /> ) : (
                                            <img
                                                src="images/user/default-avatar.png"
                                                style={ {
                                                    height: "130px",
                                                    objectFit: "contain",
                                                    cursor: "pointer"
                                                } }
                                                alt="profile-img"
                                                className="avatar-130 img-fluid"
                                            /> ) }
                                    </div>
                                    <div className="profile-detail">
                                        <label className="mt-3">Chọn ảnh đại diện</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Tên của bạn</label>
                                    <input
                                        type="username"
                                        className="form-control mb-0"
                                        id="username"
                                        onChange={ ( e ) => { setName( e.target.value ) } }
                                        value={ name }
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Giới tính</label>
                                    <select className="form-control"
                                        value={ gender } onChange={ ( e ) =>
                                        {
                                            setGender( e.target.value );
                                        } }
                                        required>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                        <option value="2">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthday">Ngày sinh</label>
                                    <input
                                        type="date"
                                        className="form-control mb-0"
                                        id="birthday"
                                        onChange={ ( e ) => { setBirthday( e.target.value ) } }
                                        value={ birthday }
                                        required
                                    />
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck1"
                                            required
                                        />
                                        <label className="custom-control-label" htmlFor="customCheck1">
                                            Tôi đồng ý với <Link className="font-weight-bold"> các điều khoản sử dụng</Link> của trang.
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-3 w-100 font-weight-bold" type="submit">
                                    Đăng ký ngay
                                </button>
                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2 text-center w-100">
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
        </section >
    )
}

export default Information