import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ToastContext } from '../../App';

function PageSuggests ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ userData, setUserData ] = useState();
    const [ refresh, setRefresh ] = useState( false );
    const [ minCount, setMinCount ] = useState( 0 );
    const [ maxCount, setMaxCount ] = useState( 4 );
    const notify = useContext( ToastContext );

    const handleGetPopularUser = () =>
    {
        axios.get( "http://localhost:8080/api/user/getPopularUser/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.followCount - a.followCount );
                setUserData( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleFollow = ( targetId ) =>
    {
        axios.post( "http://localhost:8080/api/follow/create", {
            sourceId: loginUserId,
            targetId: targetId
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                notify( res.data, "success" );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetPopularUser();
    }, [ refresh ] )

    console.log( userData?.length );

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Người dùng nổi bật</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="suggested-page-story m-0 p-0 list-inline">
                    { userData?.map( ( data, index ) => (
                        index > minCount && index < maxCount && data?.userId !== loginUserId && data?.status !== "4" &&
                        <li className="mb-3" key={ index } >
                            <div className="d-flex align-items-center mb-3">
                                <Link to={ "/profile/" + data?.userId }>
                                    <img
                                        src={ data?.avatarSrc }
                                        alt="story-img"
                                        className="rounded-circle img-fluid avatar-50"
                                    />
                                </Link>
                                <div className="stories-data ml-3">
                                    <Link to={ "/profile/" + data?.userId } className="h6">{ data?.name }</Link>
                                    <div className="social-info">
                                        <div className="social-data-block align-items-center justify-content-between list-inline p-0 m-0">
                                            <h6>Bài viết: { data?.postCount }</h6>
                                            <h6>Lượt theo dõi: { data?.followCount }</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="btn d-block" onClick={ () =>
                                {
                                    handleFollow( data?.userId )
                                } }>
                                    <i className="ri-user-follow-line mr-2" />
                                    Theo dõi
                                </div>
                            </div>
                        </li>
                    ) ) }
                    { userData?.length > 2 ? <li>
                        <div className="btn btn-primary d-block mt-3"
                            onClick={ () =>
                            {
                                setMinCount( prev => prev + 3 )
                                setMaxCount( prev => prev + 3 )
                            } }>
                            Xem thêm
                        </div>
                    </li> : <p>Bạn đã theo dõi tất cả người dùng trong hệ thống.</p> }

                </ul>
            </div>
        </div >

    )
}

export default PageSuggests