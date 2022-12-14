import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/common/AdminNavbar'
import AdminSidebar from '../components/common/AdminSidebar'
import DeletePostModal from '../components/common/modal/DeletePostModal';
import DeleteReportModal from '../components/common/modal/DeleteReportModal';
import ViewReportModal from '../components/common/modal/ViewReportModal';

function AdminReportManagement ()
{
  const [ reports, setReports ] = useState();
  const [ refresh, setRefresh ] = useState( false );
  const navigate = useNavigate();

  const handleGetAllReport = () =>
  {
    axios.get( "http://localhost:8080/api/report/getAll",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem( "token" )
        }
      } )
      .then( ( res ) =>
      {
        let sortData = [ ...res.data ].sort( ( a, b ) => b.regDate - a.regDate );
        setReports( sortData );
      } )
      .catch( ( err ) =>
      {
        console.log( err.response );
      } );
  };

  const handleUpdateStatus = ( report ) =>
  {
    axios.post( "http://localhost:8080/api/report/updateStatus", {
      reportId: report?.reportId
    },
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem( "token" )
        }
      } )
      .then( ( res ) =>
      {

        setRefresh( !refresh );
      } )
      .catch( ( err ) =>
      {
        console.log( err.response );
      } );
  };

  const convertDate = ( time ) =>
  {
    var date = new Date( time );
    return date.toLocaleDateString( 'en-GB' );
  }

  useEffect( () =>
  {
    if ( localStorage.getItem( "userStatus" ) !== "4" )
    {
      navigate( "/" );
    }
  }, [] )

  useEffect( () =>
  {
    handleGetAllReport();
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
                  <h4 className="card-title">Danh sách báo cáo</h4>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Người gửi</th>
                    <th>Ngày gửi</th>
                    <th>Loại báo cáo</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  { reports?.map( ( report, index ) => (
                    <>
                      <ViewReportModal reportData={ report } refresh={ refresh } setRefresh={ setRefresh }></ViewReportModal>
                      { report?.post && <DeletePostModal data={ report?.post } refresh={ refresh } setRefresh={ setRefresh } reportId={ report?.reportId }></DeletePostModal> }
                      <DeleteReportModal reportData={ report } refresh={ refresh } setRefresh={ setRefresh }></DeleteReportModal>
                      <tr key={ index }>
                        <th>{ report?.reportId }</th>
                        <td>{ report?.sourceUser?.name }</td>
                        <td>{ convertDate( report?.regDate ) }</td>
                        <td>{ report?.postId == null ? "Người dùng" : "Bài viết" }</td>
                        { report?.status === "0" ? <td className="text-danger">Chưa xử lý </td> : <td className="text-primary">Đã xử lý </td> }
                        <td>
                          <button class="btn btn-primary" style={ { width: "120px" } } data-toggle="modal" data-target={ "#view-report-modal-" + report?.reportId }>Xem chi tiết</button>
                          { report?.status === "0" ?
                            <button class="btn btn-primary ml-3" style={ { width: "155px" } }
                              onClick={ () => handleUpdateStatus( report ) }>Chuyển trạng thái</button> :
                            <button class="btn btn-secondary ml-3" style={ { width: "155px" } }
                              onClick={ () => handleUpdateStatus( report ) }>Chuyển trạng thái</button> }
                          <button class="btn btn-danger ml-3" style={ { width: "70px" } } data-toggle="modal" data-target={ "#delete-report-modal-" + report?.reportId }>Xóa</button>
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
    </React.Fragment>
  )
}

export default AdminReportManagement