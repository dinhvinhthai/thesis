import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function FriendList ( { friendData } )
{
    const [ count, setCount ] = useState( 9 );

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Bạn bè ({ friendData?.length })</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                    <p className="btn m-0 p-0" onClick={ () => setCount( prev => prev + 9 ) }>
                        Xem thêm
                    </p>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                    { friendData?.map( ( data, index ) => (
                        index < count &&
                        < li className="col-4 p-1 m-0" key={ index } >
                            <Link to={ "/profile/" + data?.userId }>
                                <img
                                    src={ data?.avatarSrc }
                                    style={ {
                                        width: "90px",
                                        height: "90px",
                                        objectFit: "cover"
                                    } }
                                    alt="gallery-img"
                                    className="img-fluid"
                                />
                                <h6 className="mt-1 text-center">{ data?.name }</h6>
                            </Link>
                        </li>
                    ) ) }
                </ul>
            </div>
        </div >
    )
}

export default FriendList