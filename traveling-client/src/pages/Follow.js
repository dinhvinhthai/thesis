import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/common/Layout'
import Post from '../components/common/Post'
import * as SystemConst from "../constant/SystemConst"

function Follow ()
{

    const navigate = useNavigate();
    const token = localStorage.getItem( "token" );
    const [ followPostData, setFollowPostData ] = useState();
    const urlParam = useParams();
    const [ refresh, setRefresh ] = useState( false );

    const checkLogin = () =>
    {
        if ( !token )
        {
            navigate( "/login" );

        }
    }

    const handleGetFollowPost = () =>
    {
        axios.get( "http://localhost:8080/api/post/getFollowOfUserId/" + urlParam?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                console.log( res.data );
                let sortData = [ ...res.data ].sort( ( a, b ) => b.postId - a.postId );
                setFollowPostData( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        if ( !urlParam )
        {
            navigate( "/" );
        }
        checkLogin();
        handleGetFollowPost();
    }, [ refresh ] );

    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="follows">
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
                                <h2>Đang theo dõi</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="content-page" className="content-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 mx-auto">
                                { followPostData?.map( ( data, index ) => (
                                    <div className="col-sm-12" key={ index }>
                                        { data?.isDelete !== "1" &&
                                            <Post data={ data } refresh={ refresh } setRefresh={ setRefresh } />
                                        }
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Follow