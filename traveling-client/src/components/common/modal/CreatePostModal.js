import axios from 'axios';
import React, { useContext, useState } from 'react'
import * as SystemConst from "../../../constant/SystemConst"
import { ToastContext } from '../../../App';

function CreatePostModal ( { refresh, setRefresh } )
{
    const notify = useContext( ToastContext );
    const inputRefImages = React.useRef();
    const inputRefVideo = React.useRef();
    const [ status, setStatus ] = useState( SystemConst.POST_STATUS_PUBLIC );
    const [ imageFile, setImageFile ] = useState();
    const [ videoFile, setVideoFile ] = useState();
    const [ imageSource, setImageSource ] = useState();
    const [ videoSource, setVideoSource ] = useState();
    const [ text, setText ] = useState();

    const handleImageChange = ( e ) =>
    {
        var files = e.target.files;
        setImageFile( files );
        setVideoFile( "" );
        var url = [];
        for ( let file of files )
        {
            url.push( URL.createObjectURL( file ) );
        }
        setImageSource( url );
        setVideoSource( "" );
    };

    const handleVideoChange = ( e ) =>
    {
        var file = e.target.files[ 0 ];
        setVideoFile( file );
        setImageFile( "" );
        var url = URL.createObjectURL( file );
        setVideoSource( url );
        setImageSource( "" );
    };

    const handleChooseImage = ( e ) =>
    {
        inputRefImages.current.click();
    };

    const handleChooseVideo = ( e ) =>
    {
        inputRefVideo.current.click();
    };


    const clearInput = () =>
    {
        setStatus( SystemConst.POST_STATUS_PUBLIC );
        setText( "" );
        setImageFile( "" );
        setVideoFile( "" );
        setImageSource( "" );
        setVideoSource( "" );
    }

    const handleSendPost = ( e ) =>
    {
        e.preventDefault();
        let userData = {
            "userId": JSON.parse( localStorage.getItem( "userData" ) ).userId,
            "text": text,
            "status": status
        };
        let jsonBlob = ( obj ) =>
        {
            return new Blob( [ JSON.stringify( obj ) ], {
                type: "application/json",
            } );
        };
        let formData = new FormData();
        if ( imageFile )
        {
            for ( let i = 0; i < imageFile.length; i++ )
            {
                formData.append( "file", imageFile[ i ] );
            }
            formData.append( "type", "img" );
        }
        else
        {
            formData.append( "file", videoFile );
            formData.append( "type", "video" );
        }
        formData.append( "post", jsonBlob( userData ) );
        axios.post( "http://localhost:8080/api/post/create", formData,
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
                notify( res.data, "success" );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
                notify( "L???i h??? th???ng!!!", "fail" )
            } );
    };

    return (
        <div
            className="modal fade create-post-modal"
            id="post-modal"
            tabIndex={ -1 }
            role="dialog"
            aria-labelledby="post-modalLabel"
            aria-hidden="true"
            style={ { border: "none" } }
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="post-modalLabel">
                            T???o b??i vi???t m???i
                        </h5>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={ clearInput }
                        >
                            <i className="las la-times"></i>
                        </button>
                    </div>
                    <form encType="multipart/form-data" onSubmit={ ( e ) => handleSendPost( e ) }>
                        <input
                            ref={ inputRefVideo }
                            className="d-none"
                            type="file"
                            accept="video/*"
                            onChange={ handleVideoChange }
                        />
                        <input
                            ref={ inputRefImages }
                            className="d-none"
                            type="file"
                            accept="image/*"
                            onChange={ handleImageChange }
                            multiple
                        />
                        <div className="modal-body">
                            <div className="d-flex align-items-center">
                                <textarea placeholder="H??y vi???t g?? ????" className="form-control" rows={ 5 } value={ text } onChange={ ( e ) => { setText( e.target.value ) } }></textarea>
                            </div>
                            <hr />
                            { imageSource || videoSource ?
                                <>
                                    <div className="text-center">
                                        <span className="btn" onClick={ () =>
                                        {
                                            setImageFile( "" );
                                            setVideoFile( "" );
                                            setImageSource( "" );
                                            setVideoSource( "" );
                                        } }>
                                            <i className="las la-eraser"></i> X??a
                                        </span>
                                        { videoSource && (
                                            <video
                                                className="VideoInput_video"
                                                width="100%"
                                                height={ 250 }
                                                controls
                                                src={ videoSource }
                                            />
                                        ) }
                                        <div
                                            id={ "post-img" }
                                            className="carousel slide"
                                            data-ride="carousel"
                                        >
                                            <div className="carousel-inner">
                                                { imageSource && imageSource?.map( ( img, index ) => (
                                                    index == 0 ?
                                                        <div className={ "carousel-item active" } key={ index }>
                                                            <img key={ index } style={ {
                                                                height: "200px",
                                                                objectFit: "contain"
                                                            } } src={ img } alt="post-img" className="img-fluid rounded m-2"></img>
                                                        </div> :
                                                        <div className={ "carousel-item" } key={ index }  >
                                                            <img key={ index } style={ {
                                                                height: "200px",
                                                                objectFit: "contain"
                                                            } } src={ img } alt="post-img" className="img-fluid rounded m-2"></img>
                                                        </div>
                                                ) ) }
                                            </div>
                                            <div
                                                className="btn carousel-control-prev"
                                                href={ "#post-img" }
                                                role="button"
                                                data-slide="prev"
                                                style={ { color: "black" } }
                                            >
                                                <i className="las la-arrow-left"></i>
                                                <span className="sr-only">Previous</span>
                                            </div>
                                            <div
                                                className="btn carousel-control-next"
                                                href={ "#post-img" }
                                                role="button"
                                                data-slide="next"
                                                style={ { color: "black" } }
                                            >
                                                <i className="las la-arrow-right"></i>
                                                <span className="sr-only">Next</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                                : <></> }

                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li className="col-md-6 mb-3">
                                    <div className="btn iq-bg-primary rounded p-2 pointer mr-3 w-100 text-left"
                                        onClick={ handleChooseImage }>
                                        <i className="las la-image"></i>
                                        Th??m h??nh ???nh
                                    </div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="btn iq-bg-primary rounded p-2 pointer mr-3 w-100 text-left"
                                        onClick={ handleChooseVideo }>
                                        <i className="las la-video"></i>
                                        Th??m video
                                    </div>
                                </li>
                            </ul>
                            <hr />
                            <div className="other-option">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center ml-2">
                                        <h6>Ai c?? th??? th???y b??i vi???t n??y?</h6>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="btn dropdown">
                                            <span
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                            >
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_PUBLIC ? ( "T???t c??? m???i ng?????i" ) : <></> }</h6>
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_FOLLOW ? ( "Ng?????i theo d??i t??i" ) : <></> }</h6>
                                                <h6 className="text-primary">{ status === SystemConst.POST_STATUS_PRIVATE ? ( "Ch??? m??nh t??i" ) : <></> }</h6>
                                            </span>
                                            <ul className="dropdown-menu">
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_PUBLIC ) } >
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-save-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>C??ng khai</h6>
                                                            <p className="mb-0">T???t c??? m???i ng?????i</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_FOLLOW ) }>
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-close-circle-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>Theo d??i t??i</h6>
                                                            <p className="mb-0">Ng?????i theo d??i t??i</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="btn dropdown-item p-3" onClick={ () => setStatus( SystemConst.POST_STATUS_PRIVATE ) }>
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20">
                                                            <i className="ri-notification-line" />
                                                        </div>
                                                        <div className="data ml-2">
                                                            <h6>Ri??ng t??</h6>
                                                            <p className="mb-0">Ch??? m??nh t??i</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                data-toggle="modal"
                                data-target="#post-modal"
                                className="btn btn-primary d-block w-100 mt-3"
                            >
                                ????ng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal