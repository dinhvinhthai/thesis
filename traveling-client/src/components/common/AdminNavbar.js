import React from 'react'
import { Link } from 'react-router-dom';

function AdminNavbar ()
{
    return (
        <div className="iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="row navbar navbar-expand-lg navbar-light p-0">
                    <div className="col-4 iq-navbar-logo d-flex justify-content-between">
                        <Link to="/admin">
                            <h3 className="ml-4 mt-3 text-primary font-weight-bold">Admin Management</h3>
                        </Link>
                    </div>
                    <Link to="/login" onClick={ () => { localStorage.clear() } } className="d-flex align-items-center">
                        <i className="ri-logout-box-line" />
                        <h6 className="m-3">Đăng xuất</h6>
                    </Link>
                </nav>
            </div>
        </div >
    )
}

export default AdminNavbar