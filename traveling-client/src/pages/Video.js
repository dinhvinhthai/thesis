import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/common/Layout'
import Post from '../components/common/Post'
import * as SystemConst from "../constant/SystemConst"

function Video ()
{
    const navigate = useNavigate();
    const token = localStorage.getItem( "token" );
    const [ videoPostData, setVideoPostData ] = useState();

    const checkLogin = () =>
    {
        if ( !token )
        {
            navigate( "/login" );

        }
    }

    const handleGetFollowPost = () =>
    {
        axios.get( "http://localhost:8080/api/post/getAllVideoPost",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                console.log( res.data );
                let sortData = [ ...res.data ].sort( ( a, b ) => b.postId - a.postId );
                setVideoPostData( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        checkLogin();
        handleGetFollowPost();
    }, [ 0 ] );

    return (
        <React.Fragment>
            <Layout></Layout>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img
                        src="/images/profile-img-1.png"
                        style={ { height: "250px", objectFit: "cover" } }
                        className="img-fluid w-100 rounded rounded"
                        alt="header-bg"
                    />
                    <div className="title-on-header">
                        <div className="data-block">
                            <h2>Video</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 mx-auto">
                            { videoPostData?.map( ( data, index ) => (
                                <div className="col-sm-12" key={ index }>
                                    { data?.status === SystemConst.POST_STATUS_PUBLIC ? <Post data={ data } /> : <></> }
                                </div>
                            ) ) }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Video