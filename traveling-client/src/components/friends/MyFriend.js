import React from 'react'

function MyFriend ()
{
    return (
        <li className="d-flex align-items-center">
            <div className="user-img img-fluid">
                <img
                    src="images/user/default-avatar.png"
                    alt="story-img"
                    className="rounded-circle avatar-40"
                />
            </div>
            <div className="media-support-info ml-3">
                <h6>Name</h6>
                <p className="mb-0">Bạn bè</p>
            </div>
            <div className="d-flex align-items-center">
                <a
                    href="void()"
                    className="mr-3 btn btn-primary rounded"
                >
                    Theo dõi
                </a>
            </div>
        </li>
    )
}

export default MyFriend