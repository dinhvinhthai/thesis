import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react';
import * as SystemConst from "../../constant/SystemConst";
import SharePostModal from './modal/SharePostModal';
import DeletePostModal from './modal/DeletePostModal';
import PopupPostModal from './modal/PopupPostModal';
import Comment from './Comment';
import ReplyComment from './ReplyComment';
import { ToastContext } from '../../App';
import ChangeStatusPostModal from './modal/ChangeStatusPostModal';
import ReportPostModal from './modal/ReportPostModal';
import RemoveShareModal from './modal/RemoveShareModal';

function Post ( { data, refresh, setRefresh, reportId } )
{
    console.log( data?.isDelete !== "1" );
    const notify = useContext( ToastContext );
    const inputRefImages = React.useRef();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ userData, setUserData ] = useState();
    const [ likeData, setLikeData ] = useState();
    const [ viewComment, setViewComment ] = useState( false );
    const [ like, setLike ] = useState( false );
    const [ comment, setComment ] = useState();
    const [ commentData, setCommentData ] = useState();
    const [ imageFile, setImageFile ] = useState();
    const [ imageSource, setImageSource ] = useState();
    const [ showPicker, setShowPicker ] = useState( false );
    const [ shareData, setShareData ] = useState();
    const [ isShare, setIsShare ] = useState( false );
    const [ isSave, setIsSave ] = useState( false );
    const param = useParams();
    const userStatus = JSON.parse( localStorage.getItem( "userStatus" ) );

    const clearInput = () =>
    {
        setComment( "" );
        setImageFile( "" );
        setImageSource( "" );
    }

    const handleImageChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setImageFile( file );
        var url = URL.createObjectURL( file );
        setImageSource( url );
    };

    const handleChooseImage = ( e ) =>
    {
        inputRefImages.current.click();
    };

    const handleGetUser = () =>
    {
        axios.get( "http://localhost:8080/api/user/getById/" + data?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setUserData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleGetLikeOfPost = () =>
    {
        axios.get( "http://localhost:8080/api/like/getByPostId/" + data?.postId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setLikeData( res.data );
                isLike( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleLikePost = () =>
    {
        axios.post( "http://localhost:8080/api/like/likePost", {
            userId: loginUserId,
            postId: data?.postId
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
                handleNotify( data?.userId, SystemConst.NOTIFICATION_SEND_LIKE_POST )
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleUnLikePost = () =>
    {
        let unLikeId;
        for ( var i = 0; i < likeData.length; i++ )
        {
            if ( likeData[ i ]?.userId == loginUserId )
            {
                unLikeId = likeData[ i ]?.likeId;
            }
        }
        axios.delete( "http://localhost:8080/api/like/unLikePost/" + unLikeId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setLike( false );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const isLike = ( likeData ) =>
    {
        for ( var i = 0; i < likeData?.length; i++ )
        {
            if ( likeData[ i ]?.userId == loginUserId )
            {
                setLike( true );
            }
        }
    };

    const isLoginShare = ( shareData ) =>
    {
        for ( var i = 0; i < shareData?.length; i++ )
        {
            if ( shareData[ i ]?.userId == loginUserId )
            {
                setIsShare( true );
            }
        }
    };

    const handleComment = ( e ) =>
    {
        let commentData = {
            "userId": loginUserId,
            "postId": data?.postId,
            "text": comment
        };
        let jsonBlob = ( obj ) =>
        {
            return new Blob( [ JSON.stringify( obj ) ], {
                type: "application/json",
            } );
        };
        if ( !imageFile && !commentData?.text )
        {
            return;
        }
        let formData = new FormData();
        formData.append( "file", imageFile );
        formData.append( "comment", jsonBlob( commentData ) )
        axios.post( "http://localhost:8080/api/comment/create", formData,
            {
                headers: {
                    'Accept': 'application/json ,text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                clearInput();
                setRefresh( !refresh );
                handleNotify( data?.userId, SystemConst.NOTIFICATION_SEND_COMMENT );
                setViewComment( true );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleGetComment = async () =>
    {
        await axios.get( "http://localhost:8080/api/comment/getByPostId/" + data?.postId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                // let sortData = [ ...res.data ].sort( ( a, b ) => b.regDate - a.regDate );
                setCommentData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleGetShare = async () =>
    {
        await axios.get( "http://localhost:8080/api/share/getByPostId/" + data?.postId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setShareData( res.data );
                isLoginShare( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleSavePost = async () =>
    {
        await axios.post( "http://localhost:8080/api/bookmark/create", {
            userId: loginUserId,
            postId: data?.postId
        },
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
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleUnSavePost = async () =>
    {
        await axios.delete( "http://localhost:8080/api/bookmark/delete/" + loginUserId + "/" + data?.postId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                setIsSave( false );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const handleGetSaveList = () =>
    {
        axios.get( "http://localhost:8080/api/bookmark/findByUserId/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                isSavePost( res.data );
            } )
            .catch( ( err ) =>
            {
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };

    const isSavePost = ( saveList ) =>
    {
        for ( var i = 0; i < saveList?.length; i++ )
        {
            if ( saveList[ i ]?.postId === data?.postId )
            {
                setIsSave( true );
            }
        }
    }

    const convertStatus = ( num ) =>
    {
        if ( num === SystemConst.POST_STATUS_PUBLIC )
        {
            return num = "Công khai";
        }
        if ( num === SystemConst.POST_STATUS_FOLLOW )
        {
            return num = "Theo dõi tôi";
        }

        return num = "Riêng tư";

    }

    const convertDate = ( time ) =>
    {
        var date = Math.round( ( Date.now() - new Date( time ) ) / 1000 );
        switch ( true )
        {
            case date < 60:
                return date + " giây trước";
            case ( date > 60 && date < ( 60 * 60 ) ):
                return Math.round( date / 60 ) + " phút trước";
            case ( date > ( 60 * 60 ) && date < ( 60 * 60 * 24 ) ):
                return Math.round( date / ( 60 * 60 ) ) + " giờ trước";
            default:
                return new Date( time ).toLocaleDateString( 'en-GB' );
        }
    }

    const countComment = ( commentData ) =>
    {
        var count = commentData?.length;
        for ( var i = 0; i < commentData?.length; i++ )
        {
            count = count + commentData[ i ]?.replyComment?.length;
        }
        return count;
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
        handleGetUser();
        handleGetLikeOfPost();
        handleGetShare();
        handleGetSaveList();
        handleGetComment();
    }, [ data, refresh ] );

    return (
        <div className="iq-card">
            <SharePostModal data={ data } refresh={ refresh } setRefresh={ setRefresh } setIsShare={ setIsShare } />
            <RemoveShareModal data={ data } refresh={ refresh } setRefresh={ setRefresh } setIsShare={ setIsShare } />
            <DeletePostModal data={ data } refresh={ refresh } setRefresh={ setRefresh } />
            <ChangeStatusPostModal data={ data } refresh={ refresh } setRefresh={ setRefresh } />
            <ReportPostModal data={ data } />
            <PopupPostModal data={ data } />
            { showPicker &&
                <div style={ { position: "absolute", bottom: "80px", right: "20px", zIndex: "999" } }>
                    <EmojiPicker onEmojiClick={ ( e ) =>
                    {
                        if ( comment != null )
                        {
                            setComment( prev => prev + e.emoji );
                        } else
                        {
                            setComment( e.emoji );
                        }
                        setShowPicker( false );
                    } } />
                </div> }
            <div className="iq-card-body">
                <div className="user-post-data">
                    { isShare && <p className="text-primary font-weight-bold">Bạn đã chia sẻ bài viết này.</p> }
                    { data?.user?.name && !isShare && param?.userId && data?.userId != param?.userId && <p className="text-primary font-weight-bold">{ data?.user?.name } đã chia sẻ bài viết này.</p> }
                    <div className="d-flex flex-wrap">
                        <div className="media-support-user-img mr-3">
                            <Link to={ "/profile/" + userData?.userId }>
                                <img
                                    src={ userData?.avatarSrc }
                                    style={ {
                                        objectFit: "cover",
                                        height: "60px",
                                        width: "60px"
                                    } }
                                    className="rounded-circle img-fluid"
                                    alt="avatar-img"
                                />
                            </Link>
                        </div>
                        <div className="media-support-info mt-2">
                            <p className="mb-0 d-inline-block font-weight-bold h6">
                                <Link to={ "/profile/" + userData?.userId }>
                                    { userData?.name }
                                </Link>
                            </p>
                            <p className="mb-0 d-inline-block ml-1">đã đăng bài viết vào { convertDate( data?.regDate ) }</p>
                            <div className="text-primary d-flex align-items-center">
                                <i className="ri-global-fill mr-1 mt-0 mb-0"></i>
                                <p className="mt-0 mb-0">{ convertStatus( data?.status ) }</p>
                                { data?.userId === loginUserId && <i className="btn ri-edit-2-line m-0 p-0 ml-1"
                                    data-toggle="modal" data-target={ "#change-post-modal-" + data?.postId }></i> }
                            </div>

                        </div>

                        <div className="iq-card-post-toolbar">
                            <div className="btn dropdown m-0 p-0">
                                <span
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    role="button"
                                >
                                    <i className="ri-more-fill" />
                                </span>
                                <div className="dropdown-menu m-0 p-0">
                                    { userStatus == "4" || data?.userId == loginUserId ? <>
                                        {/* <div className="btn m-0 p-0 dropdown-item p-3">
                                            <div className="d-flex align-items-center">
                                                <div className="icon font-size-20">
                                                    <i className="ri-edit-line" />
                                                </div>
                                                <div className="data ml-3">
                                                    <h6>Chỉnh sửa bài viết</h6>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="btn m-0 p-0 dropdown-item p-3" data-toggle="modal" data-target={ "#delete-post-modal-" + data?.postId }>
                                            <div className="d-flex align-items-center">
                                                <div className="icon font-size-20">
                                                    <i className="ri-delete-bin-line" />
                                                </div>
                                                <div className="data ml-3">
                                                    <h6 className="text-danger mt-2">Xóa bài viết</h6>
                                                </div>
                                            </div>
                                        </div></> : <></> }
                                    { !isSave ?
                                        <div className="btn m-0 p-0 dropdown-item p-3" onClick={ () =>
                                        {
                                            handleSavePost();
                                        } }>
                                            <div className="d-flex align-items-center">
                                                <div className="icon font-size-20">
                                                    <i className="ri-save-line" />
                                                </div>
                                                <div className="data ml-3">
                                                    <h6 className="mt-2">Lưu bài viết</h6>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="btn m-0 p-0 dropdown-item p-3" onClick={ () =>
                                        {
                                            handleUnSavePost();
                                        } }>
                                            <div className="d-flex align-items-center">
                                                <div className="icon font-size-20">
                                                    <i className="ri-save-line" />
                                                </div>
                                                <div className="data ml-3">
                                                    <h6 className="mt-2 text-danger">Hủy lưu bài viết</h6>
                                                </div>
                                            </div>
                                        </div> }
                                    {/* <div className="btn m-0 p-0 dropdown-item p-3">
                                        <div className="d-flex align-items-center">
                                            <div className="icon font-size-20">
                                                <i className="ri-close-circle-line" />
                                            </div>
                                            <div className="data ml-3">
                                                <h6>Ẩn bài viết</h6>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="btn m-0 p-0 dropdown-item p-3" data-toggle="modal" data-target={ "#report-post-modal-" + data?.postId }>
                                        <div className="d-flex align-items-center">
                                            <div className="icon font-size-20">
                                                <i className="ri-user-unfollow-line" />
                                            </div>
                                            <div className="data ml-3">
                                                <h6 className="mt-2">Báo cáo vi phạm</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-0 pl-3">
                    <p className="text-justify mb-0">
                        { data.text }
                    </p>
                </div>
                { data?.videos && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <video
                            title="video"
                            className="embed-responsive-item"
                            src={ data?.videos.path }
                            controls
                        />
                    </div>

                ) }

                { ( data?.images?.length > 0 || data?.videos != null ) ?
                    <div className="user-post" data-toggle="modal" data-target={ "#popup-post-modal-" + data?.postId }>
                        <div className="d-flex btn">
                            <div className="col-md-12 row m-0 p-0">
                                { data?.images && data?.images?.map( ( img, index ) => (
                                    data?.images?.length == 1 ?
                                        (
                                            <div className="mx-auto" key={ index }>
                                                <img
                                                    src={ img?.path }
                                                    alt="post-img"
                                                    className="img-fluid rounded w-100"
                                                />
                                            </div>
                                        ) : data?.images?.length > 4 ?
                                            ( index < 3 ?
                                                <div className="col-sm-6 p-1 mx-auto" key={ index }>
                                                    <img
                                                        style={ {
                                                            maxHeight: "180px",
                                                            objectFit: "cover"
                                                        } }
                                                        src={ img?.path }
                                                        alt="post-img"
                                                        className="img-fluid rounded w-100"
                                                    />
                                                </div> : index < 4 &&
                                                <div div className="col-sm-6 p-1 mx-auto" key={ index } style={ { position: "relative" } }>
                                                    <h3 className="text-primary" style={ {
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate( -50%, -50%)",
                                                        color: "#fff"
                                                    } }>+{ data?.images?.length - index - 1 }</h3>
                                                    <img
                                                        style={ {
                                                            maxHeight: "180px",
                                                            objectFit: "cover",
                                                            opacity: "0.5"
                                                        } }
                                                        src={ img?.path }
                                                        alt="post-img"
                                                        className="img-fluid rounded w-100"
                                                    />
                                                </div> ) :
                                            (
                                                <div className="col-sm-6 p-1 mx-auto" key={ index }>
                                                    <img
                                                        style={ {
                                                            maxHeight: "180px",
                                                            objectFit: "cover"
                                                        } }
                                                        src={ img?.path }
                                                        alt="post-img"
                                                        className="img-fluid rounded w-100"
                                                    />
                                                </div> )
                                ) ) }
                            </div>
                        </div>
                    </div> : <></> }
                <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="like-block position-relative d-flex align-items-center p-0 m-0">
                            <div className="d-flex align-items-center">
                                {
                                    like ?
                                        <div className="btn d-flex p-0 m-0 ml-3" onClick={ () => { handleUnLikePost() } }>
                                            <i className="las la-heart h5 p-0 m-0"></i>
                                            <p className="ml-2 p-0 m-0">Yêu thích</p>
                                        </div>

                                        :
                                        <div className="btn d-flex p-0 m-0 ml-3" onClick={ () => { handleLikePost() } }>
                                            <i className="lar la-heart h5 p-0 m-0"></i>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mr-3">
                            <div className="total-like-block mr-3">
                                <div className="btn dropdown m-0 p-0">
                                    <span
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        role="button"
                                    >
                                        { likeData?.length } lượt yêu thích
                                    </span>
                                    { likeData?.length > 0 ? <div className="dropdown-menu">
                                        { likeData?.map( ( data, index ) => (
                                            <Link className="dropdown-item" to={ "/profile/" + data?.userId } key={ index } >
                                                { data?.user?.name }
                                            </Link>
                                        ) ) }
                                        {/* <Link className="dropdown-item" to="/profile">
                                            và ... người khác
                                        </Link> */}
                                    </div> : "" }
                                </div>
                            </div>
                            <div className="total-like-block mr-0">
                                <div className="btn dropdown m-0 p-0">
                                    <span
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        role="button"
                                    >
                                        { shareData?.length } lượt chia sẻ
                                    </span>
                                    { shareData?.length > 0 ? <div className="dropdown-menu">
                                        { shareData?.map( ( data, index ) => (
                                            <Link className="dropdown-item" to={ "/profile/" + data?.userId } key={ index } >
                                                { data?.user?.name }
                                            </Link>
                                        ) ) }
                                        {/* <Link className="dropdown-item" to="/profile">
                                            và ... người khác
                                        </Link> */}
                                    </div> : "" }
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    { viewComment ? (
                        <><p className="btn text-primary pl-2 mb-2 ml-2" onClick={ ( () =>
                        {
                            setViewComment( !viewComment );
                        } ) }><i className="ri-discuss-line h4"></i>Ẩn bình luận
                        </p>
                            { isShare ?
                                <div className="btn text-primary float-right font-weight-bold mb-0 mr-1" data-toggle="modal" data-target={ "#unshare-modal-" + data?.postId }>
                                    <i className="ri-share-line h4 "></i>
                                    Hủy chia sẻ
                                </div> :
                                <div className="btn text-primary float-right font-weight-bold mb-0 mr-1" data-toggle="modal" data-target={ "#share-modal-" + data?.postId }
                                    onClick={ () =>
                                    {
                                        localStorage.setItem( "postId", data?.postId );
                                    } }
                                >
                                    <i className="ri-share-line h4 "></i>
                                    Chia sẻ
                                </div>
                            }
                            <ul className="post-comments p-0 m-0 ml-3">
                                { commentData?.map( ( cm, index ) => <>
                                    <Comment cm={ cm } key={ index } refresh={ refresh } setRefresh={ setRefresh } ></Comment>
                                    { cm?.replyComment?.map( ( scm, index ) =>
                                        <ReplyComment userReply={ cm?.user } scm={ scm } key={ index } refresh={ refresh } setRefresh={ setRefresh } ></ReplyComment>
                                    )
                                    }
                                </>

                                ) }
                            </ul>
                        </> ) :
                        <>
                            <p className="btn text-primary pl-2 mb-2 ml-2"><i className="ri-discuss-line h4"></i>Bình luận ({ countComment( commentData ) })
                                { commentData?.length > 2 && <span onClick={ ( () =>
                                {
                                    setViewComment( !viewComment );
                                } ) }> - Xem tất cả</span> }
                            </p>
                            { isShare ?
                                <div className="btn text-primary float-right font-weight-bold mb-0 mr-1" data-toggle="modal" data-target={ "#unshare-modal-" + data?.postId }>
                                    <i className="ri-share-line h4P "></i>
                                    Hủy chia sẻ
                                </div> :
                                <div className="btn text-primary float-right font-weight-bold mb-0 mr-1" data-toggle="modal" data-target={ "#share-modal-" + data?.postId }
                                    onClick={ () =>
                                    {
                                        localStorage.setItem( "postId", data?.postId );
                                    } }
                                >
                                    <i className="ri-share-line h4 "></i>
                                    Chia sẻ
                                </div>
                            }
                            <ul className="post-comments p-0 m-0 ml-3">
                                { commentData?.map( ( cm, index ) => (
                                    index < 2 &&
                                    <>
                                        <Comment cm={ cm } key={ index } refresh={ refresh } setRefresh={ setRefresh } ></Comment>
                                        { cm?.replyComment?.map( ( scm, index ) =>
                                            <ReplyComment scm={ scm } key={ index } refresh={ refresh } setRefresh={ setRefresh } ></ReplyComment>
                                        )
                                        }
                                    </>
                                ) ) }
                            </ul>
                        </>
                    }
                    <form className="comment-text d-flex align-items-center mt-3" onSubmit={ ( e ) => e.preventDefault() }>
                        <input type="text"
                            className="form-control rounded"
                            placeholder="Viết bình luận..."
                            onChange={ ( e ) => { setComment( e.target.value ) } }
                            value={ comment }
                            onKeyPress={ event =>
                            {
                                if ( event.key === 'Enter' )
                                {
                                    handleComment();
                                }
                            } }
                        />
                        <input
                            ref={ inputRefImages }
                            className="d-none"
                            type="file"
                            accept="image/*"
                            onChange={ handleImageChange }
                        />
                        <div className="comment-attagement d-flex">
                            <div className="btn m-0 p-0" onClick={ () => setShowPicker( !showPicker ) }>
                                <i className="ri-user-smile-line mr-3" />
                            </div>
                            <div className="btn m-0 p-0" onClick={ () => handleChooseImage() }>
                                <i className="ri-file-2-line mr-3" />
                            </div>
                            <div className="btn m-0 p-0" onClick={ () => handleComment() }>
                                <i className="ri-send-plane-line mr-3" />
                            </div>
                        </div>
                    </form>

                    { imageSource ? ( <>
                        <span className="btn mx-auto w-100" onClick={ () =>
                        {
                            setImageFile( "" );
                            setImageSource( "" );
                        } }>
                            <i className="las la-eraser"></i> Xóa
                        </span>
                        <img style={ {
                            height: "150px",
                            objectFit: "contain"
                        } } src={ imageSource } alt="post-img" className="img-fluid rounded text-center mt-2 w-100"></img>
                    </>

                    ) : "" }
                </div>
            </div >
        </div >


    )
}

export default Post