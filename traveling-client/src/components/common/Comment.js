import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteCommentModal from './modal/DeleteCommentModal';
import * as SystemConst from "../../constant/SystemConst";

function Comment ( { cm, refresh, setRefresh } )
{
    const [ commentLikeData, setCommentLikeData ] = useState();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ like, setLike ] = useState( false );
    const [ comment, setComment ] = useState();
    const [ imageFile, setImageFile ] = useState();
    const [ imageSource, setImageSource ] = useState();
    const inputRefImages = React.useRef();
    const [ showPicker, setShowPicker ] = useState( false );
    const [ reply, setReply ] = useState( false );

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

    const handleLikeComment = ( commentId ) =>
    {
        axios.post( "http://localhost:8080/api/like/likeComment", {
            userId: loginUserId,
            commentId: commentId
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleUnLikeComment = () =>
    {
        let unLikeId;
        for ( var i = 0; i < commentLikeData.length; i++ )
        {
            if ( commentLikeData[ i ]?.userId == loginUserId )
            {
                unLikeId = commentLikeData[ i ]?.likeId;
            }
        }
        axios.delete( "http://localhost:8080/api/like/unLikeComment/" + unLikeId,
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
            } );
    };


    const handleGetLikeOfComment = () =>
    {
        axios.get( "http://localhost:8080/api/like/getByCommentId/" + cm?.commentId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setCommentLikeData( res.data );
                isLike( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const isLike = ( commentLikeData ) =>
    {
        for ( var i = 0; i < commentLikeData?.length; i++ )
        {
            if ( commentLikeData[ i ]?.userId == loginUserId )
            {
                setLike( true );
            }
        }
    }

    const handleComment = ( e ) =>
    {
        let commentData = {
            "userId": loginUserId,
            "postId": cm?.postId,
            "parentId": cm?.parentId ? cm?.parentId : cm?.commentId,
            "replyId": cm?.commentId,
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
        formData.append( "comment", jsonBlob( commentData ) );
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
                setReply( !reply );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleSendNotification = ( type ) =>
    {
        axios.post( "http://localhost:8080/api/notification/create", {
            sourceId: loginUserId,
            targetId: cm?.userId,
            type: type
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                console.log( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetLikeOfComment();
    }, [ refresh ] );

    return (
        <React.Fragment>
            <DeleteCommentModal data={ cm } refresh={ refresh } setRefresh={ setRefresh } />
            <li className="mb-2">
                <div className="d-flex flex-wrap">
                    <div className="user-img">
                        <img
                            src={ cm?.user?.avatarSrc }
                            alt="user-img"
                            className="avatar-40 rounded-circle img-fluid"
                        />
                    </div>
                    <div className="comment-data-block ml-3">
                        <Link to={ "/profile/" + cm?.userId } className="h6">{ cm?.user?.name }</Link>
                        <span className="mb-0"> -- { convertDate( cm?.regDate ) }</span>
                        { cm?.isDelete === SystemConst.FLG_ON ? <p className="font-italic"> Bình luận đã bị xóa</p> :
                            <>
                                { cm?.userId === loginUserId && <span className="btn m-0 p-0 ml-3 text-danger" data-toggle="modal" data-target={ "#delete-comment-modal-" + cm?.commentId }>
                                    <i class="las la-trash"></i>Xóa</span> }
                                <p className="text-justify mt-1 mb-1">{ cm?.text }</p>
                                { cm?.images != null &&
                                    <img style={ {
                                        height: "180px",
                                        objectFit: "contain"
                                    } } src={ cm?.images?.path } alt="post-img" className="img-fluid rounded"></img>
                                }
                                <div className="d-flex flex-wrap align-items-center comment-activity">
                                    { like ? <p className="btn m-0 p-0 font-weight-bold text-primary" onClick={ () =>
                                    {
                                        handleUnLikeComment()
                                    } }>Đã thích { commentLikeData?.length > 0 && "(" + commentLikeData?.length + ")" }</p> : <p className="btn m-0 p-0" onClick={ () =>
                                    {
                                        handleLikeComment( cm?.commentId )
                                    } }>Yêu thích { commentLikeData?.length > 0 && "(" + commentLikeData?.length + ")" }</p> }

                                    <p className="btn m-0 p-0 mx-3" onClick={ () => setReply( !reply ) }>Trả lời
                                        {/* ({ cm?.replyComment?.length }) */ }
                                    </p>
                                    {/* <p className="btn m-0 p-0">Báo cáo</p> */ }
                                </div>
                            </> }
                    </div>
                </div>
                { showPicker && <div style={ { position: "absolute", bottom: "80px", right: "20px", zIndex: "999" } }>
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
                { reply ? <form className="comment-text d-flex align-items-center mt-3 mb-3 ml-5" onSubmit={ ( e ) => e.preventDefault() }>
                    <input
                        ref={ inputRefImages }
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={ handleImageChange }
                    />
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
                </form> : <></> }
                { imageSource ? (
                    <img style={ {
                        height: "150px",
                        objectFit: "contain"
                    } } src={ imageSource } alt="post-img" className="img-fluid rounded text-center mt-2 w-100"></img>
                ) : "" }
            </li>
        </React.Fragment >

    )
}

export default Comment