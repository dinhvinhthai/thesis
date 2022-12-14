import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/common/AdminNavbar'
import AdminSidebar from '../components/common/AdminSidebar'
import * as SystemConst from "../constant/SystemConst"
import { ToastContext } from '../App';
import LockUserModal from '../components/common/modal/LockUserModal';

function AdminUserManagement ()
{
  const [ users, setUsers ] = useState();
  const [ type, setType ] = useState();
  const [ refresh, setRefresh ] = useState( false );
  const navigate = useNavigate();

  const handleGetAllUser = () =>
  {
    axios.get( "http://localhost:8080/api/user/getAll",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem( "token" )
        }
      } )
      .then( ( res ) =>
      {
        let sortData = [ ...res.data ].sort( ( a, b ) => a.userId - b.userId );
        setUsers( sortData );
      } )
      .catch( ( err ) =>
      {
        console.log( err.response );
      } );
  };


  const convertStatus = ( status ) =>
  {
    switch ( status )
    {
      case SystemConst.USER_STATUS_NON_VERIFY:
        return "Chưa xác thực tài khoản";
      case SystemConst.USER_STATUS_NON_SETUP:
        return "Chưa thiết lập thông tin cơ bản";
      case SystemConst.USER_STATUS_LOCKED:
        return "Đã bị khóa";
      default:
        return "Bình thường";
    }
  };

  useEffect( () =>
  {
    if ( localStorage.getItem( "userStatus" ) !== "4" )
    {
      navigate( "/" );
    }
  }, [] );

  useEffect( () =>
  {
    handleGetAllUser();
  }, [ refresh ] )

  return (
    <React.Fragment>
      <AdminSidebar></AdminSidebar>
      <AdminNavbar></AdminNavbar>
      <div id="content-page" className="content-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Danh sách người dùng</h4>
                  <h4 className="card-title">Tổng: { users?.length }</h4>
                </div>

              </div>
            </div>
            <div className="col-sm-12">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  { users?.map( ( user, index ) => (
                    user?.status !== "4" &&
                    <>
                      <LockUserModal type={ type } data={ user } refresh={ refresh } setRefresh={ setRefresh }></LockUserModal>
                      <tr key={ index }>
                        <th>{ user?.userId }</th>
                        <td>{ user?.name }</td>
                        <td>{ user?.email }</td>
                        <td>{ convertStatus( user?.status ) }</td>
                        <td className="d-flex">
                          <Link to={ "/profile/" + user?.userId }>
                            <button class="btn btn-secondary" style={ { width: "180px" } }>Xem trang cá nhân</button>
                          </Link>
                          { user?.status === SystemConst.USER_STATUS_LOCKED ?
                            <button class="btn btn-primary ml-3" style={ { width: "180px" } }
                              data-toggle="modal" data-target={ "#lock-user-modal-" + user?.userId } onClick={ () => setType( "unlock" ) }>Mở khóa tài khoản</button>
                            : <button class="btn btn-danger ml-3" style={ { width: "180px" } }
                              data-toggle="modal" data-target={ "#lock-user-modal-" + user?.userId } onClick={ () => setType( "lock" ) }>Khóa tài khoản</button> }
                        </td>
                      </tr>
                    </>
                  ) ) }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment >
  )
}

export default AdminUserManagement