import React from 'react'
import { Link } from 'react-router-dom';

function OptionModal ()
{
    const logoutHandle = () =>
    {
        localStorage.clear();
    }
    return (
        <div className="iq-sub-dropdown iq-user-dropdown">
            <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                    <div className="bg-primary p-3 line-height">
                        <h5 className="mb-0 text-white line-height">
                            Cài đặt chung
                        </h5>
                    </div>
                    <Link
                        to="/settings"
                        className="iq-sub-card iq-bg-primary-hover"
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                                <i className=" ri-settings-3-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Cài đặt và quyền riêng tư</h6>
                                <p className="mb-0 font-size-12">
                                    Thực hiện các cài đặt và quyền riêng tư
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="profile.html"
                        className="iq-sub-card iq-bg-primary-hover"
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-book-mark-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Điều khoản sử dụng</h6>
                                <p className="mb-0 font-size-12">
                                    Xem điều khoản sử dụng
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="/login"
                        className="iq-sub-card iq-bg-primary-hover"
                        onClick={ () => { logoutHandle() } }
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-logout-box-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Đăng xuất</h6>
                                <p className="mb-0 font-size-12">
                                    Rời khỏi trang
                                </p>
                            </div>
                        </div>
                    </Link>
                    {/* <Link
                        to="profile-edit.html"
                        className="iq-sub-card iq-bg-warning-hover"
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-warning">
                                <i className="ri-profile-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Edit Profile</h6>
                                <p className="mb-0 font-size-12">
                                    Modify your personal details.
                                </p>
                            </div>
                        </div>
                    </Link> */}
                    {/* <Link
                        to="account-setting.html"
                        className="iq-sub-card iq-bg-info-hover"
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-info">
                                <i className="ri-logout-box-r-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Đăng xuất</h6>
                                <p className="mb-0 font-size-12">
                                    Rời khỏi trang
                                </p>
                            </div>
                        </div>
                    </Link> */}
                    {/* <Link
                        to="privacy-setting.html"
                        className="iq-sub-card iq-bg-danger-hover"
                    >
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-danger">
                                <i className="ri-lock-line" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">Privacy Settings</h6>
                                <p className="mb-0 font-size-12">
                                    Control your privacy parameters.
                                </p>
                            </div>
                        </div>
                    </Link> */}
                    {/* <div className="d-inline-block w-100 text-center p-3">
                        <Link
                            className="bg-primary iq-sign-btn"
                            to="/login"
                            role="button"
                            onClick={ () => { logoutHandle() } }
                        >
                            Sign out
                            <i className="ri-login-box-line ml-2" />
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default OptionModal