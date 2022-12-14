import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout'
import Post from '../components/common/Post'
import * as SystemConst from "../constant/SystemConst"

function Bookmark ()
{
    const navigate = useNavigate();
    const [ postData, setPostData ] = useState();
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const token = localStorage.getItem( "token" );
    const [ refresh, setRefresh ] = useState( false );
    const checkLogin = () =>
    {
        if ( !token )
        {
            navigate( "/login" );

        }
    }
    const handlGetBookmark = () =>
    {
        axios.get( "http://localhost:8080/api/bookmark/findByUserId/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setPostData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        checkLogin();
        handlGetBookmark();
    }, [ refresh ] );

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
                            <h2>Bài viết đã lưu</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 mx-auto">
                            { postData?.map( ( data, index ) => (
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
        </React.Fragment>
    )
}

export default Bookmark