import axios from 'axios';
import React, { useContext } from 'react'
import { ToastContext } from '../../App';

function BlockLine ( { data, refresh, setRefresh } )
{
    const notify = useContext( ToastContext );
    const convertDate = ( time ) =>
    {
        var date = new Date( time );
        return date.toLocaleDateString( 'en-GB' );
    }


    const handleUnBlockUser = async () =>
    {
        console.log( data?.blockId );
        await axios.delete( "http://localhost:8080/api/block/delete/" + data?.blockId,
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
                notify( "Lỗi hệ thống!!!", "fail" )
            } );
    };


    return (
        <div className="iq-card">
            <div className="iq-card-body">
                <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center">
                        <div className="user-img img-fluid">
                            <img
                                src={ data?.user?.avatarSrc }
                                style={ { objectFit: "cover" } }
                                alt="story-img"
                                className="rounded-circle avatar-50"
                            />
                        </div>
                        <div className="media-support-info ml-3">
                            <h6>{ data?.user?.name }</h6>
                            <p className="mb-0">Ngày chặn: { convertDate( data?.regDate ) }</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="iq-card-header-toolbar d-flex align-items-center" onClick={ () =>
                            {
                                handleUnBlockUser();
                            } }>
                                <h6 className="btn text-danger">Bỏ chặn</h6>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BlockLine