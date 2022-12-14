import React from 'react'

function ChangeTab ()
{
    return (
        <div className="iq-card">
            <div className="iq-card-body p-0">
                <div className="user-tabing">
                    <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                        <li className="col-sm-4 p-0 mx-auto text-center">
                            <h6 className="btn nav-link active" data-toggle="pill" href="#timeline">
                                Dòng thời gian
                            </h6>
                        </li>
                        <li className="col-sm-4 p-0 mx-auto text-center">
                            <h6 className="btn nav-link" data-toggle="pill" href="#about">
                                Thông tin
                            </h6>
                        </li>
                        <li className="col-sm-4 p-0 mx-auto text-center">
                            <h6 className="btn nav-link" data-toggle="pill" href="#photos">
                                Thư viện
                            </h6>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChangeTab