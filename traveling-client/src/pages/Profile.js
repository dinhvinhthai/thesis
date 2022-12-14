import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/profile/child/ProfileHeader'
import ChangeTab from '../components/profile/child/ChangeTab'
import Timeline from '../components/profile/tab/TimelineTab'
import AboutTab from '../components/profile/tab/AboutTab'
import FriendsContent from '../components/friends/FriendsContent'
import LibraryTab from '../components/profile/tab/LibraryTab'
import Layout from '../components/common/Layout'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CreatePostModal from '../components/common/modal/CreatePostModal'
import EditIntroModal from '../components/common/modal/EditIntroModal'
import ReportUserModal from '../components/common/modal/ReportUserModal'
import BlockUserModal from '../components/common/modal/BlockUserModal'
import { isFocusable } from '@testing-library/user-event/dist/utils'

function Profile ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const navigate = useNavigate();
    const urlParam = useParams();
    const [ userData, setUserData ] = useState();
    const [ refresh, setRefresh ] = useState( false );
    const [ isBlock, setIsBlock ] = useState( false );
    const [ blockData, setBlockData ] = useState();
    const [ blockText, setBlockText ] = useState();

    const handleGetUserData = async () =>
    {
        await axios.get( "http://localhost:8080/api/user/getById/" + urlParam?.userId,
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
            } );
    };


    const handleGetBlockUser = async () =>
    {
        await axios.get( "http://localhost:8080/api/block/getAll",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setBlockData( res.data );
                checkBlockUser( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const checkBlockUser = ( list ) =>
    {
        for ( var i = 0; i < list?.length; i++ )
        {
            if ( list[ i ]?.sourceId == loginUserId )
            {
                if ( list[ i ]?.targetId == urlParam?.userId )
                {
                    setIsBlock( true );
                    setBlockText( "Bạn đã chặn người dùng này." );
                }
            } else if ( list[ i ]?.sourceId == urlParam?.userId )
            {
                if ( list[ i ]?.targetId == loginUserId )
                {
                    setIsBlock( true );
                    setBlockText( "Người dùng này đã chăn bạn." );
                }
            }
        }
    }


    useEffect( () =>
    {
        if ( !urlParam?.userId )
        {
            navigate( "/" );
        }
        handleGetUserData();
        handleGetBlockUser();
    }, [ urlParam?.userId, refresh ] );

    return (
        <React.Fragment>
            <Layout></Layout>
            <CreatePostModal refresh={ refresh } setRefresh={ setRefresh } />
            <EditIntroModal userData={ userData } refresh={ refresh } setRefresh={ setRefresh } />
            <ReportUserModal userData={ userData } refresh={ refresh } setRefresh={ setRefresh } />
            <BlockUserModal userData={ userData } refresh={ refresh } setRefresh={ setRefresh } setIsBlock={ setIsBlock } />
            <div id="content-page" className="content-page">
                <div className="container">
                    { !isBlock ?
                        <div className="row">
                            <div className="col-sm-12">
                                <ProfileHeader userData={ userData } refresh={ refresh } setRefresh={ setRefresh } isBlock={ isBlock } setIsBlock={ setIsBlock }></ProfileHeader>
                                <ChangeTab userData={ userData } refresh={ refresh } setRefresh={ setRefresh }></ChangeTab>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-content">
                                    <Timeline urlParam={ urlParam } userData={ userData } refresh={ refresh } setRefresh={ setRefresh }></Timeline>
                                    <AboutTab urlParam={ urlParam } userData={ userData } refresh={ refresh } setRefresh={ setRefresh }></AboutTab>
                                    <LibraryTab urlParam={ urlParam } userData={ userData } refresh={ refresh } setRefresh={ setRefresh }></LibraryTab>

                                </div>
                            </div>
                        </div>
                        : <div className="text-center mt-3">
                            <p>{ blockText } Không thể xem nội dung của họ.</p>
                            <Link to="/">Quay lại trang chủ</Link>
                        </div> }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile