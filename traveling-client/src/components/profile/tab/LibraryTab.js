import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PopupPostModal from '../../common/modal/PopupPostModal';
import ImageBlock from '../child/ImageBlock'
import VideoBlock from '../child/VideoBlock'

function LibraryTab ()
{
    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ images, setImages ] = useState();
    const [ videos, setVideos ] = useState();
    const params = useParams();
    const handleGetAllImages = () =>
    {
        axios.get( "http://localhost:8080/api/storage/getMyImages/" + params?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.imageId - a.imageId );
                setImages( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleGetAllVideos = () =>
    {
        axios.get( "http://localhost:8080/api/storage/getMyVideos/" + params?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.videoId - a.videoId );
                setVideos( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetAllImages();
        handleGetAllVideos();
    }, [ 0 ] )

    return (
        <div className="tab-pane fade" id="photos" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                    <h4 className="mt-3 w-25">Thư viện</h4>
                    <hr />
                    <div className="friend-list-tab mt-2">
                        <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                            <li>
                                <div className="btn nav-link active" data-toggle="pill" href="#my-photos">
                                    Ảnh đã đăng
                                </div>
                            </li>
                            <li>
                                <div className="btn nav-link" data-toggle="pill" href="#my-videos">
                                    Video đã đăng
                                </div>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="my-photos" role="tabpanel">
                                <div className="iq-card-body p-0">
                                    <div className="row">
                                        { images?.length > 0 ? images?.map( ( image, index ) => (
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <ImageBlock image={ image } key={ index } />
                                            </div>

                                        ) ) : <div className="text-center w-100">
                                            <p>Trống rỗng</p>
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="my-videos" role="tabpanel">
                                <div className="iq-card-body p-0">
                                    <div className="row">
                                        { videos?.length > 0 ? videos?.map( ( video, index ) => (
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <VideoBlock video={ video } key={ index } />
                                            </div>
                                        ) ) : <div className="text-center w-100">
                                            <p>Trống rỗng</p>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LibraryTab