import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteChatRoomModal from '../common/modal/DeleteChatRoomModal';
import * as SystemConst from "../../constant/SystemConst"
import DeleteMessageModal from '../common/modal/DeleteMessageModal';
import { useEffect } from 'react';

function ChatBox ( { data, refresh, setRefresh } )
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const loginUserData = JSON.parse( localStorage.getItem( "userData" ) );
    const [ text, setText ] = useState();
    const [ showPicker, setShowPicker ] = useState( false );
    const inputRefImage = React.useRef();
    const inputRefVideo = React.useRef();
    const inputRefFile = React.useRef();
    const [ imageFile, setImageFile ] = useState();
    const [ videoFile, setVideoFile ] = useState();
    const [ docFile, setDocFile ] = useState();
    const [ attachFile, setAttachFile ] = useState();
    const handleImageChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setImageFile( file );
        setVideoFile( "" );
        setDocFile( "" );
        setAttachFile( file.name );
    };

    const handleVideoChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setVideoFile( file );
        setImageFile( "" );
        setDocFile( "" );
        setAttachFile( file.name );
    };

    const handleFileChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setDocFile( file );
        setImageFile( "" );
        setVideoFile( "" );
        setAttachFile( file.name );
    };

    const handleChooseImage = ( e ) =>
    {
        inputRefImage.current.click();
    };

    const handleChooseVideo = ( e ) =>
    {
        inputRefVideo.current.click();
    };

    const handleChooseFile = ( e ) =>
    {
        inputRefFile.current.click();
    };

    const convertChatUser = ( users ) =>
    {
        for ( var i = 0; i < users?.length; i++ )
        {
            if ( users[ i ]?.userId !== loginUserId )
            {
                return users[ i ]?.userId;
            }
        }
    }

    const filterChatUser = ( users ) =>
    {
        return users.filter( item => item?.userId !== loginUserId );
    }

    const userData = filterChatUser( data?.users );

    const convertDate = ( time ) =>
    {
        time = new Date( time );
        return time.getHours() + ":" + time.getMinutes() + " " + time.toLocaleDateString( 'en-GB' );
    }

    const clearInput = () =>
    {
        setText( "" );
        setImageFile( "" );
        setVideoFile( "" );
        setDocFile( "" );
        setAttachFile( "" );
    }

    const handleSendMessage = ( e ) =>
    {
        e.preventDefault();
        let message = {
            "sendId": loginUserId,
            "receiveId": userData[ 0 ]?.userId,
            "chatRoomId": data?.chatRoomId,
            "text": text
        };
        let jsonBlob = ( obj ) =>
        {
            return new Blob( [ JSON.stringify( obj ) ], {
                type: "application/json",
            } );
        };
        if ( text === "" && !imageFile && !videoFile && !docFile )
        {
            return;
        }
        let formData = new FormData();
        formData.append( "message", jsonBlob( message ) );
        if ( imageFile )
        {
            formData.append( "file", imageFile );
            formData.append( "type", "img" );
        } else if ( videoFile )
        {
            formData.append( "file", videoFile );
            formData.append( "type", "video" );
        } else
        {
            formData.append( "file", docFile );
            formData.append( "type", "file" );
        }
        axios.post( "http://localhost:8080/api/message/create", formData,
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
                handleNotify( userData[ 0 ]?.userId, SystemConst.NOTIFICATION_SEND_MESSAGE )
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

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

    return (
        <div className="tab-pane fade" id={ "chatbox-" + convertChatUser( data?.users ) } role="tabpanel">
            { showPicker &&
                <div style={ { position: "absolute", bottom: "80px", right: "20px", zIndex: "999" } }>
                    <EmojiPicker onEmojiClick={ ( e ) =>
                    {
                        if ( text != null )
                        {
                            setText( prev => prev + e.emoji );
                        } else
                        {
                            setText( e.emoji );
                        }
                        setShowPicker( false );
                    } } />
                </div> }
            <DeleteChatRoomModal data={ data } refresh={ refresh } setRefresh={ setRefresh } />
            <div className="chat-head">
                <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                    <div className="d-flex align-items-center">
                        <div className="sidebar-toggle">
                            <i className="ri-menu-3-line" />
                        </div>
                        <div className="avatar chat-user-profile m-0 mr-3">
                            <img src={ userData[ 0 ]?.avatarSrc } alt="avatar" className="avatar-50 " />
                        </div>
                        <h5 className="mb-0">{ userData[ 0 ]?.name }</h5>

                    </div>
                    <div className="btn text-danger" data-toggle="modal" data-target={ "#delete-chatroom-modal-" + data?.chatRoomId }>
                        <i className="las la-trash-alt"></i> Xóa
                    </div>
                </header>
            </div>
            <div className="chat-content scroller">
                { data?.messages.sort( ( a, b ) => a.messageId - b.messageId )?.map( ( message, index ) => (
                    message?.sendId === loginUserId ?
                        ( message?.text || message?.image || message?.video || message?.file ?
                            <div className="chat mt-3" key={ index }>
                                <DeleteMessageModal data={ message } refresh={ refresh } setRefresh={ setRefresh }></DeleteMessageModal>
                                <div className="chat-user">
                                    <img src={ loginUserData?.avatarUrl } alt="avatar" className="avatar-50" style={ { objectFit: "cover" } } />
                                    <span className="chat-time mt-2">{ convertDate( message?.regDate ) }</span>
                                </div>
                                { message?.isDelete === "0" ?
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            <p>{ message?.text }</p>
                                            <a href={ message?.image } target="_blank">
                                                { message?.image &&
                                                    <img
                                                        src={ message?.image }
                                                        alt="img-post"
                                                        className="img-fluid rounded mt-2"
                                                        style={ { height: "200px" } }
                                                    />
                                                }
                                            </a>
                                            { message?.video &&
                                                <video
                                                    title="video"
                                                    className="embed-responsive-item  mt-2"
                                                    src={ message?.video }
                                                    style={ { height: "200px" } }
                                                    controls
                                                />
                                            }
                                            { message?.file &&
                                                <a href={ message?.file } title="chat-file" className="link text-light font-weight-bold" target="_blank" download><p>File: { message?.file.replace( "http://localhost:8080/content/", "" ) }</p></a>
                                            }

                                        </div>
                                        <i className="btn ri-delete-bin-line float-right" data-toggle="modal" data-target={ "#delete-message-modal-" + message?.messageId } />
                                    </div> :
                                    <div className="chat-detail">
                                        <div className="chat-message bg-secondary">
                                            <p>Tin nhắn đã bị xóa</p>
                                        </div>
                                    </div> }
                            </div>
                            : <></> )
                        :
                        ( message?.text || message?.image || message?.video || message?.file ?
                            <div className="chat mt-3 chat-left" key={ index }>
                                <DeleteMessageModal data={ message } refresh={ refresh } setRefresh={ setRefresh }></DeleteMessageModal>
                                <div className="chat-user">
                                    <img src={ message?.user?.avatarSrc } alt="avatar" className="avatar-50" style={ { objectFit: "cover" } } />
                                    <span className="chat-time mt-2">{ convertDate( message?.regDate ) }</span>
                                </div>
                                { message?.isDelete === "0" ?
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            <p>{ message?.text }</p>
                                            { message?.image &&
                                                <a href={ message?.image } target="_blank">
                                                    <img
                                                        src={ message?.image }
                                                        alt="img-post"
                                                        className="img-fluid rounded"
                                                        style={ { height: "240px" } }
                                                    />
                                                </a>

                                            }
                                            { message?.video &&
                                                <video
                                                    title="video"
                                                    className="embed-responsive-item "
                                                    src={ message?.video }
                                                    style={ { height: "200px" } }
                                                    controls
                                                />
                                            }
                                            { message?.file &&
                                                <a href={ message?.file } title="chat-file" className="link font-weight-bold" target="_blank" download><p>File: { message?.file.replace( "http://localhost:8080/content/", "" ) }</p></a>
                                            }

                                        </div>
                                    </div> :
                                    <div className="chat-detail">
                                        <div className="chat-message bg-secondary">
                                            <p>Tin nhắn đã bị xóa</p>
                                        </div>
                                    </div> }
                            </div>
                            : <></> )
                ) ) }
            </div>
            { attachFile && <p className="text-center">Gửi kèm file <span className="font-weight-bold">{ attachFile }</span>
                <span className="btn text-danger" onClick={ () =>
                {
                    setImageFile( "" );
                    setVideoFile( "" );
                    setDocFile( "" );
                    setAttachFile( "" );
                } }>
                    <i className="las la-eraser"></i> Xóa
                </span></p> }
            <div className="chat-footer p-3 bg-white">
                <form className="d-flex align-items-center" onSubmit={ ( e ) => handleSendMessage( e ) } encType="multipart/form-data">
                    <input
                        ref={ inputRefImage }
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={ handleImageChange }
                    />
                    <input
                        ref={ inputRefVideo }
                        className="d-none"
                        type="file"
                        accept="video/*"
                        onChange={ handleVideoChange }
                    />
                    <input
                        ref={ inputRefFile }
                        className="d-none"
                        type="file"
                        accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .zip, .rar, .exe"
                        onChange={ handleFileChange }
                    />
                    <div className="chat-attagement d-flex">
                        <div className="btn" onClick={ () => setShowPicker( !showPicker ) }>
                            <i className="fa fa-smile-o" aria-hidden="true" />
                        </div>
                        <div className="btn" onClick={ handleChooseImage }>
                            <i className="fa fa-file-image-o" aria-hidden="true"></i>
                        </div>
                        <div className="btn" onClick={ handleChooseVideo }>
                            <i className="fa fa-file-video-o" aria-hidden="true"></i>
                        </div>
                        <div className="btn" onClick={ handleChooseFile }>
                            <i className="fa fa-paperclip" aria-hidden="true" />
                        </div>
                    </div>
                    <input
                        type="text"
                        className="form-control mr-3"
                        placeholder="Nhập tin nhắn..."
                        onChange={ ( e ) => { setText( e.target.value ) } }
                        value={ text }
                    />
                    <button
                        type="submit"
                        className="btn btn-primary d-flex align-items-center p-2"
                    >
                        <i className="fa fa-paper-plane-o" aria-hidden="true" />
                        <span className="d-none d-lg-block ml-1">Gửi</span>
                    </button>
                </form>
            </div>
        </div >
    )
}

export default ChatBox