import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FriendBlock from './FriendBlock'
import FollowMe from './FollowMe';
import { useParams } from 'react-router-dom';

function FriendsContent ()
{
    const [ friendData, setFriendData ] = useState();
    const [ followerData, setFollowerData ] = useState();
    const [ followingData, setFollowingData ] = useState();

    const [ refresh, setRefresh ] = useState( false );
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const handleGetFriend = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFriendById/" + loginUserId,
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

    const handleGetFollowing = () =>
    {
        axios.get( "http://localhost:8080/api/follow/getFollowingById/" + loginUserId,
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

    const handleGetFollower = async () =>
    {
        await axios.get( "http://localhost:8080/api/follow/getFollowerById/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setFollowerData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetFriend();
        handleGetFollowing();
        handleGetFollower();
    }, [ refresh ] );

    return (
        <div className="tab-pane" id="friends" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                    <h3 className="text-primary text-center">B???n b?? v?? theo d??i</h3>
                    <hr />
                    <div className="friend-list-tab mt-2">
                        <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                            <li>
                                <h6
                                    className="btn nav-link"
                                    data-toggle="pill"
                                    data-target="#all-friends"
                                    onClick={ () => { handleGetFriend() } }
                                >
                                    B???n b??
                                </h6>
                            </li>
                            <li>
                                <h6 className="btn nav-link" data-toggle="pill" data-target="#following" onClick={ () => { handleGetFollowing() } }>
                                    ??ang theo d??i
                                </h6>
                            </li>
                            <li>
                                <h6 className="btn  nav-link active" data-toggle="pill" data-target="#follower" onClick={ () => { handleGetFollower() } }>
                                    ???????c theo d??i
                                </h6>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                className="tab-pane fade active show"
                                id="all-friends"
                                role="tabpanel"
                            >
                                <div className="iq-card-body p-0">
                                    <h5 className="text-center mb-2">Danh s??ch b???n b??</h5>
                                    <div className="row">
                                        { friendData?.length > 0 ? friendData?.map( ( data, index ) => (
                                            <div className="col-md-6 col-lg-6 mb-3" key={ index }>
                                                <FriendBlock userData={ data } refresh={ refresh } setRefresh={ setRefresh }></FriendBlock>
                                            </div>
                                        ) ) : <div className="p-3 text-center w-100">
                                            <p>B???n ch??a c?? b???t k?? b???n b?? n??o c??? :(</p>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="following" role="tabpanel">
                                <div className="iq-card-body p-0">
                                    <h5 className="text-center mb-2">Danh s??ch b???n theo d??i</h5>
                                    <div className="row">
                                        { followingData?.length > 0 ? followingData?.map( ( data, index ) => (
                                            <div className="col-md-6 col-lg-6 mb-3" key={ index }>
                                                <FriendBlock userData={ data } refresh={ refresh } setRefresh={ setRefresh }></FriendBlock>
                                            </div>
                                        ) ) : <div className="p-3 text-center w-100">
                                            <p>B???n ch??a theo d??i ai c??? :(</p>
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="follower" role="tabpanel">
                                <div className="iq-card-body p-0">
                                    <h5 className="text-center mb-2">Danh s??ch theo d??i b???n</h5>
                                    <div className="row">
                                        { followerData?.length > 0 ? followerData?.map( ( data, index ) => (
                                            <div className="col-md-6 col-lg-6 mb-3" key={ index }>
                                                <FollowMe userData={ data } refresh={ refresh } setRefresh={ setRefresh }></FollowMe>
                                            </div>
                                        ) ) : <div className="p-3 text-center w-100">
                                            <p>Tr???ng</p>
                                        </div> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default FriendsContent