import FriendList from '../child/FriendList'
import PhotoList from '../child/PhotoList'
import CreatePost from '../../common/CreatePost'
import Post from '../../common/Post'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Introduce from '../child/Introduce'

function TimelineTab ( { urlParam, userData, refresh, setRefresh } )
{
    const navigate = useNavigate();
    const token = localStorage.getItem( "token" );
    const [ postData, setPostData ] = useState();
    const [ friendData, setFriendData ] = useState();
    const loginData = JSON.parse( localStorage.getItem( "userData" ) );
    const [ followingData, setFollowingData ] = useState();
    const userStatus = JSON.parse( localStorage.getItem( "userStatus" ) );

    const checkLogin = () =>
    {
        if ( !token )
        {
            navigate( "/login" );
        }
    }

    const handleGetUserPost = () =>
    {
        axios.get( "http://localhost:8080/api/post/getAllOfUserId/" + urlParam?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.postId - a.postId );
                setPostData( sortData );
                handleGetFollowing();
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleGetFriend = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFriendById/" + urlParam?.userId,
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

    const handleGetFollowing = async () =>
    {
        await axios.get( "http://localhost:8080/api/follow/getFollowingById/" + loginData?.userId,
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
        handleGetFriend();
        handleGetUserPost();
    }, [ urlParam, refresh ] );

    return (
        <div className="tab-pane fade active show" id="timeline" role="tabpanel">
            <div className="iq-card-body p-0">
                <div className="row">
                    <div className="col-lg-4">
                        <div>
                            {/* <Events></Events> */ }
                            <Introduce userData={ userData }></Introduce>
                            <FriendList friendData={ friendData }></FriendList>
                            {/* <PhotoList></PhotoList> */ }
                        </div>
                    </div>
                    <div className="col-lg-8">
                        { userData?.userId === loginData?.userId && <CreatePost userData={ loginData }></CreatePost> }
                        { postData?.length > 0 ? postData?.map( ( data, index ) => (
                            <div className="col-sm-12" key={ index }>
                                { ( data?.isDelete !== "1" && ( userStatus == "4" || data?.userId === loginData?.userId || data?.status === "0"
                                    || ( isFollowPost( data?.userId, followingData ) ) && data?.status !== "2" ) ) &&
                                    <Post data={ data } refresh={ refresh } setRefresh={ setRefresh } />
                                }
                            </div>
                        ) ) : <h6 className="text-center mt-2">Người dùng này chưa đăng tải bất kì bài viết nào.</h6> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineTab