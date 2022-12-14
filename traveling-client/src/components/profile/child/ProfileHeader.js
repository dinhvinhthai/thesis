import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContext } from '../../../App';
import * as SystemConst from "../../../constant/SystemConst"

function ProfileHeader ( { userData, refresh, setRefresh } )
{
    const [ isFollow, setIsFollow ] = useState( false );
    const [ followData, setFollowData ] = useState( false );
    const urlParam = useParams();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) ).userId;
    const [ avatarFile, setAvatarFile ] = useState();
    const [ backgroundFile, setBackgroundFile ] = useState();
    const inputRefAvatar = React.useRef();
    const inputRefBackground = React.useRef();
    const [ avatar, setAvatar ] = useState( "" );
    const [ background, setBackground ] = useState( "" );
    const navigate = useNavigate();
    const notify = useContext( ToastContext );
    const isAdmin = localStorage.getItem( "userStatus" ) === SystemConst.USER_ADMIN;
    const handleChooseAvatar = ( e ) =>
    {
        inputRefAvatar.current.click();
    };

    const handleChooseBackground = ( e ) =>
    {
        inputRefBackground.current.click();
    };

    const handleAvatarChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setBackgroundFile( file );
        setAvatarFile( file );
        var url = URL.createObjectURL( file );
        setAvatar( url );
    };

    const handleBackgroundChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setBackgroundFile( file );
        var url = URL.createObjectURL( file );
        setBackground( url );
    };

    const handleUpdateAvatar = () =>
    {
        let formData = new FormData();
        formData.append( "file", avatarFile );
        axios.post( "http://localhost:8080/api/user/updateAvatar/" + loginUserId, formData,
            {
                headers: {
                    'Accept': 'application/json ,text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                window.location.reload();
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleUpdateBackground = () =>
    {
        let formData = new FormData();
        formData.append( "file", backgroundFile );
        axios.post( "http://localhost:8080/api/user/updateBackground/" + loginUserId, formData,
            {
                headers: {
                    'Accept': 'application/json ,text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                window.location.reload();
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const getFollow = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollow/" + urlParam?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setFollowData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    const getFollowingById = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollowingById/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                isLoginFollow( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    const handleFollow = () =>
    {
        axios.post( "http://localhost:8080/api/follow/create", {
            sourceId: loginUserId,
            targetId: urlParam?.userId
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                handleNotify( urlParam?.userId, SystemConst.NOTIFICATION_SEND_FOLLOW )
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleUnFollow = () =>
    {
        axios.delete( "http://localhost:8080/api/follow/delete/" + loginUserId + "/" + urlParam?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setIsFollow( false );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    }

    const isLoginFollow = ( followData ) =>
    {
        for ( var i = 0; i < followData?.length; i++ )
        {
            if ( followData[ i ]?.userId == urlParam?.userId )
            {
                setIsFollow( true );
            }
        }
    }

    const handleSendMessage = () =>
    {
        axios.post( "http://localhost:8080/api/message/createChatRoom", {
            sendId: loginUserId,
            receiveId: userData?.userId
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                navigate( "/chats" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const convertDate = ( time ) =>
    {
        var date = new Date( time );
        return date.toLocaleDateString( 'en-GB' );
    }

    const handleNotify = async ( targetId, type ) =>
    {
        if ( targetId == loginUserId )
        {
            return;
        }
        await axios.post( "http://localhost:8080/api/notification/create", {
            sourceId: loginUserId,
            targetId: targetId,
            type: type
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
            } )
            .catch( ( err ) =>
            {
            } );
    };

    useEffect( () =>
    {
        getFollow();
        getFollowingById();
    }, [ refresh, urlParam?.userId ] );

    return (
        <div className="iq-card">
            <div className="iq-card-body profile-page p-0">
                <div className="profile-header">
                    <input
                        ref={ inputRefAvatar }
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={ handleAvatarChange }
                    />
                    <input
                        ref={ inputRefBackground }
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={ handleBackgroundChange }
                    />
                    <div className="cover-container">
                        { background ? <>
                            <div className="d-flex">
                                <span className="btn mx-auto w-100" onClick={ () =>
                                {
                                    setBackground( "" );
                                    setBackgroundFile( "" );
                                } }>
                                    <i className="las la-eraser"></i> Xóa
                                </span>
                                <span className="btn mx-auto w-100" onClick={ () =>
                                {
                                    handleUpdateBackground();
                                } }>
                                    <i className="las la-save"></i>Lưu
                                </span>
                            </div>
                            <div className="btn w-100" onClick={ handleChooseBackground }>
                                <img
                                    src={ background }
                                    style={ {
                                        objectFit: "cover",
                                        height: "300px"
                                    } }
                                    alt="profile-bg"
                                    className="rounded img-fluid w-100 profile-bg"
                                />
                            </div></> : <div className="btn w-100" onClick={ handleChooseBackground }>
                            <img
                                src={ userData?.backgroundSrc ? userData?.backgroundSrc : "/images/profile-img-1.png" }
                                style={ {
                                    objectFit: "cover",
                                    height: "300px"
                                } }
                                alt="profile-bg"
                                className="rounded img-fluid w-100 profile-bg"
                            />
                        </div> }

                    </div>
                    <div className={ loginUserId != urlParam?.userId ? "user-detail text-center bt-2" : "user-detail-hide text-center bt-2" }>
                        <div className="btn m-0 p-0 profile-img" >
                            { avatar ? (
                                <>
                                    <div className="d-flex">
                                        <span className="btn mx-auto w-100" onClick={ () =>
                                        {
                                            setAvatar( "" );
                                            setAvatarFile( "" );
                                        } }>
                                            <i className="las la-eraser"></i> Xóa
                                        </span>
                                        <span className="btn mx-auto w-100" onClick={ () =>
                                        {
                                            handleUpdateAvatar();
                                        } }>
                                            <i className="las la-save"></i>Lưu
                                        </span>
                                    </div>
                                    <div className="btn m-0 p-0">
                                        <img
                                            style={ {
                                                objectFit: "cover",
                                                height: "170px",
                                                width: "170px",

                                            } } src={ avatar } alt="post-img" className="border avatar-130 img-fluid"></img>
                                    </div>
                                </>
                            ) :
                                <div className="btn m-0 p-0" onClick={ handleChooseAvatar }>

                                    <img
                                        src={ userData?.avatarSrc }
                                        style={ {
                                            objectFit: "cover",
                                            height: "170px",
                                            width: "170px",
                                        } }
                                        alt="profile-img"
                                        className="border avatar-130 img-fluid"
                                    />
                                </div> }

                        </div>
                        <div className="profile-detail">
                            <h3 className="">{ userData?.name }</h3>
                        </div>
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                        <div className="social-info">
                            <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pl-3">
                                    <h6>Bài đăng</h6>
                                    <p className="mb-0">{ userData?.statistics[ 0 ] }</p>
                                </li>
                                <li className="text-center pl-3">
                                    <h6>Đang theo dõi</h6>
                                    <p className="mb-0">{ userData?.statistics[ 1 ] }</p>
                                </li>
                                <li className="text-center pl-3">
                                    <h6>Lượt theo dõi</h6>
                                    <p className="mb-0">{ userData?.statistics[ 2 ] }</p>
                                </li>
                            </ul>
                        </div>
                        <div className="social-info">
                            <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pl-3">
                                </li>
                                <li className="text-center pl-3 mt-0 mb-0">
                                    <h6>Đã tham gia kể từ { convertDate( userData?.regDate ) }</h6>
                                </li>
                                <li className="text-center pl-3">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        { loginUserId != urlParam?.userId ? (
                            <div className="w-100 p-2">
                                <ul className="d-flex list-inline mx-auto justify-content-center">
                                    <li className="text-center">
                                        { !isFollow ?
                                            <div className="btn btn-primary" style={ { width: "110px" } } onClick={ handleFollow }>Theo dõi</div>
                                            : <div className="btn btn-secondary" style={ { width: "130px" } } onClick={ handleUnFollow }>Hủy theo dõi</div> }
                                    </li>
                                    <li className="text-center mx-2">
                                        <Link className="btn btn-primary" style={ { width: "110px" } }
                                            onClick={ () => handleSendMessage() }>Nhắn tin</Link>
                                    </li>
                                    <li className="text-center">
                                        <Link className="btn btn-primary" style={ { width: "110px" } }
                                            data-toggle="modal" data-target={ "#report-user-modal-" + userData?.userId }>Báo cáo</Link>
                                    </li>
                                    <li className="text-center ml-2">
                                        <Link className="btn btn-danger" style={ { width: "110px" } }
                                            data-toggle="modal" data-target={ "#block-user-modal-" + userData?.userId }> Chặn</Link>
                                    </li>
                                </ul>
                            </div>

                        ) : <></>
                        }
                    </div>

                </div>
            </div>
        </div >

    )
}

export default ProfileHeader