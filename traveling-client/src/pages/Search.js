import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'
import Post from '../components/common/Post'
import FriendSearchLine from '../components/friends/FriendSearchLine'
import * as SystemConst from "../constant/SystemConst"

function Search ()
{
    const urlParam = useParams();
    const [ userList, setUserList ] = useState();
    const [ postList, setPostList ] = useState();
    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ refresh, setRefresh ] = useState( false );

    const handleSearchUser = () =>
    {
        axios.get( "http://localhost:8080/api/search/searchUser/" + urlParam?.keyword,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setUserList( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleSearchPost = () =>
    {
        axios.get( "http://localhost:8080/api/search/searchPost/" + urlParam?.keyword,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setPostList( res.data );
                console.log( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleSearchUser();
        handleSearchPost();
    }, [ urlParam ] );

    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 tab-pane mx-auto" id="photos">
                            <div className="iq-card">
                                <div className="iq-card-body">
                                    <h3 className="text-center">Kết quả tìm kiếm</h3>
                                    <p className="text-center">{ urlParam?.keyword }</p>
                                    <div className="friend-list-tab mt-2">
                                        <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                                            <li>
                                                <div
                                                    className="nav-link active"
                                                    data-toggle="pill"
                                                    href="#search-user"
                                                    onClick={ () => { handleSearchUser() } }
                                                >
                                                    Người dùng
                                                </div>
                                            </li>
                                            <li>
                                                <div className="nav-link" data-toggle="pill" href="#search-post" onClick={ () => { handleSearchPost() } }>
                                                    Bài viết
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade active show"
                                                id="search-user"
                                                role="tabpanel"
                                            >

                                                <div className="iq-card">
                                                    <div className="iq-card-body">
                                                        <ul className="request-list list-inline m-0 p-0">
                                                            { userList?.map( ( data, index ) => (
                                                                <div className="col-10 mx-auto" key={ index }>
                                                                    { data?.userId !== loginId && <FriendSearchLine key={ index } userData={ data }></FriendSearchLine> }
                                                                </div>
                                                            ) ) }
                                                            { userList !== "" ? (
                                                                // <li className="d-block text-center">
                                                                //     <div className="mr-3 btn">
                                                                //         Xem tất cả
                                                                //     </div>
                                                                // </li>
                                                                <></>
                                                            ) : ( <li className="d-block text-center">
                                                                <div className="mr-3 btn">
                                                                    Không tìm thấy gì cả :( Hãy thử từ khóa khác.
                                                                </div>
                                                            </li> ) }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="search-post" role="tabpanel">
                                                <div className="iq-card-body p-0">
                                                    { postList?.map( ( data, index ) => (
                                                        <div className="col-sm-8 mx-auto" key={ index }>
                                                            { data?.status === SystemConst.POST_STATUS_PUBLIC ? <Post data={ data } refresh={ refresh } setRefresh={ setRefresh } /> : <></> }
                                                        </div>
                                                    ) ) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div >
            </div >
        </React.Fragment >
    )
}

export default Search