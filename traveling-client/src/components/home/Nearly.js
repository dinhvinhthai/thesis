import React from 'react'
import { Link } from 'react-router-dom'

function Nearly ()
{
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Hoạt động gần đây</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="media-story m-0 p-0">
                    <li className="d-flex mb-4 align-items-center active">
                        <img
                            src="images/user/default-avatar.png"
                            alt="story-img"
                            className="rounded-circle img-fluid"
                        />
                        <div className="stories-data ml-3">
                            <Link className="h6">Vân Anh</Link><span className="text"> đã đăng một bài viết mới.</span>
                            <p className="mb-0">5 phút trước</p>
                        </div>
                    </li>
                    <li className="d-flex mb-4 align-items-center">
                        <img
                            src="images/user/default-avatar.png"
                            alt="story-img"
                            className="rounded-circle img-fluid"
                        />
                        <div className="stories-data ml-3">
                            <Link className="h6">Hải</Link><span className="text"> đã đăng một bài viết mới.</span>
                            <p className="mb-0">15 phút trước</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-center">
                        <img
                            src="images/user/default-avatar.png"
                            alt="story-img"
                            className="rounded-circle img-fluid"
                        />
                        <div className="stories-data ml-3">
                            <Link className="h6">Phương</Link><span className="text"> đã đăng một bài viết mới.</span>
                            <p className="mb-0">35 phút trước</p>
                        </div>
                    </li>
                </ul>
                <a href="/" className="btn btn-primary d-block mt-3">
                    Xem thêm
                </a>
            </div>
        </div>

    )
}

export default Nearly