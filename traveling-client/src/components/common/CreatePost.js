import React from 'react'

function CreatePost ( { userData } )
{
    return (
        <div
            id="post-modal-data"
            className="iq-card"
        >
            <div className="iq-card-body" data-toggle="modal" data-target="#post-modal">
                <div className="d-flex align-items-center">
                    <div className="user-img">
                        <img
                            src={ userData?.avatarUrl }
                            style={ {
                                objectFit: "cover"
                            } }
                            alt="user-img"
                            className="avatar-60 rounded-circle"
                        />
                    </div>
                    <form className="post-text ml-3 w-100" >
                        <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Ngày hôm nay của bạn thế nào..."
                            style={ { border: "none" } }
                        />
                    </form>
                </div>
                <hr />
                <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
                    <li className="btn iq-bg-primary rounded pointer mx-1 w-100 mr-3">
                        <i className="las la-file-image"></i>
                        Hình ảnh
                    </li>
                    <li className="btn iq-bg-primary rounded pointer mx-1 w-100 mr-3">
                        <i className="las la-file-video"></i>
                        Video
                    </li>
                    <li className="btn iq-bg-primary rounded pointer mx-1 w-100 mr-3">
                        <i className="las la-sms"></i>
                        Chia sẻ
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default CreatePost