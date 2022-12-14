import React, { useEffect, useState } from 'react'
import CreatePost from '../components/common/CreatePost'
import Post from '../components/common/Post'
import PageSuggests from '../components/home/PageSuggests'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CreatePostModal from '../components/common/modal/CreatePostModal'
import Layout from '../components/common/Layout'

import 'react-toastify/dist/ReactToastify.css';

function Home ()
{
    const navigate = useNavigate();
    const [ postData, setPostData ] = useState();
    const token = localStorage.getItem( "token" );
    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ friendData, setFriendData ] = useState();
    const userData = JSON.parse( localStorage.getItem( "userData" ) );
    const userStatus = JSON.parse( localStorage.getItem( "userStatus" ) );
    const [ refresh, setRefresh ] = useState( false );
    const [ followingData, setFollowingData ] = useState();

    const checkLogin = () =>
    {
        if ( !token )
        {
            navigate( "/login" );

        }
        else
        {
            navigate( "/" );
        }
    }

    const handleGetFriend = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFriendById/" + userData?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setFriendData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleGetAllPost = () =>
    {
        axios.get( "http://localhost:8080/api/post/getAll/" + loginId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.postId - a.postId );
                // let randomData = sortData.map( value => ( { value, sort: Math.random() } ) )
                //     .sort( ( a, b ) => a.sort - b.sort )
                //     .map( ( { value } ) => value );
                setPostData( sortData );
                handleGetFollowing();
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleGetFollowing = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollowingById/" + loginId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setFollowingData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };


    const isFollowPost = ( postId, followingData ) =>
    {
        let count = 0;
        for ( var i = 0; i < followingData?.length; i++ )
        {
            if ( followingData[ i ]?.userId === postId )
            {
                count++;
            }
        }
        if ( count > 0 )
        {
            return true;
        } else
            return false;
    };


    useEffect( () =>
    {
        checkLogin();
        handleGetAllPost();
        handleGetFriend();
    }, [ refresh ] )

    return (
        <React.Fragment>
            <Layout></Layout>
            <CreatePostModal refresh={ refresh } setRefresh={ setRefresh } />
            <div className="content-page " id="news">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 row mx-auto">
                            <div className="col-sm-12">
                                <CreatePost userData={ userData } />
                            </div>
                            { postData?.map( ( data, index ) => (
                                <div className="col-sm-12" key={ index } >
                                    { ( data?.isDelete !== "1" && ( userStatus == "4" || data?.userId === loginId || data?.status === "0" ||
                                        ( isFollowPost( data?.userId, followingData ) ) && data?.status !== "2" ) ) && <Post data={ data } refresh={ refresh } setRefresh={ setRefresh } /> }
                                </div>
                            ) ) }
                        </div>
                        <div className="col-sm-4">
                            <div>
                                <PageSuggests ></PageSuggests>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home