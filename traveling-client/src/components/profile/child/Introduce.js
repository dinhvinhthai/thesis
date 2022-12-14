import React from 'react'
import { useParams } from 'react-router-dom'

function Introduce ( userData )
{
    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const param = useParams();

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Giới thiệu</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center" data-toggle="modal" data-target="#edit-introduce-modal" >
                    <p className="m-0" >
                        { param?.userId == loginId &&
                            <span className="btn m-0 p-0">Chỉnh sửa</span>
                        }
                    </p>
                </div>
            </div>
            <div className="iq-card-body text-center">
                <div className="btn">
                    { param?.userId == loginId && userData?.userData?.introduce == null ?
                        <h6 className="text-primary" data-toggle="modal" data-target="#edit-introduce-modal" >
                            <i className="las la-pencil-alt mr-1"></i>
                            Hãy viết gì đó về bạn
                        </h6> :
                        <></> }
                </div>
                { userData?.userData?.introduce && <p className="text-center">{ userData?.userData?.introduce }</p> }
            </div>
        </div>
    )
}

export default Introduce