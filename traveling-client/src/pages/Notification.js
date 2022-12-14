import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../components/common/Layout'
import NotificationLine from '../components/notification/NotificationLine'

function Friends ()
{
    const loginUserId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;

    const [ notify, setNotify ] = useState();
    const [ refresh, setRefresh ] = useState( false );

    const handleGetNotification = () =>
    {
        axios.get( "http://localhost:8080/api/notification/getAllByUserId/" + loginUserId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                let sortData = [ ...res.data ].sort( ( a, b ) => b.regDate - a.regDate );
                setNotify( sortData );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        const interval = setInterval( () =>
        {
            handleGetNotification();
        }, 1000 );
        return () => clearInterval( interval )
    } );

    // useEffect( () =>
    // {
    //     handleGetNotification();
    // }, [ refresh ] )


    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Danh sách thông báo</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            { notify?.length > 0 ? notify?.map( ( data, index ) => (
                                <NotificationLine data={ data } refresh={ refresh } setRefresh={ setRefresh }></NotificationLine>
                            ) ) : <p className="text-center">Không có thông báo nào.</p> }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Friends