import React from 'react'
import AdminNavbar from '../components/common/AdminNavbar'
import AdminSidebar from '../components/common/AdminSidebar'
import LineChart from '../components/admin/LineChart'
import BarChart from '../components/admin/BarChart'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard ()
{
  const chartUserData = [ 0, 0, 0, 3, 7, 2, 10 ];
  const chartPostData = [ 0, 0, 0, 3, 5, 12, 15 ];
  const chartReportData = [ 0, 0, 0, 1, 6, 4, 10 ];
  const chartAccessData = [ 0, 0, 3, 7, 5, 20, 25 ];
  const navigate = useNavigate();
  useEffect( () =>
  {
    if ( localStorage.getItem( "userStatus" ) !== "4" )
    {
      navigate( "/" );
    }
  }, [] )


  return (
    <React.Fragment>
      <AdminSidebar></AdminSidebar>
      <AdminNavbar></AdminNavbar>
      <div className="content-page" id="dashboard">
        <div className="container w-100">
          <div className="row">
            <div className="col-3">
              <div className="card border-primary mb-3" style={ { maxWidth: "18rem" } }>
                <h4 className="card-header text-center">Số người dùng</h4>
                <div className="card-body text-secondary">
                  <h3 className="card-title text-right">15</h3>
                  <h6 className="card-text text-primary text-right">
                    + 2 so với tháng trước
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card border-primary mb-3" style={ { maxWidth: "18rem" } }>
                <h4 className="card-header text-center">Số bài viết</h4>
                <div className="card-body text-secondary">
                  <h3 className="card-title text-right">15</h3>
                  <h6 className="card-text text-primary text-right">
                    + 5 so với tháng trước
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card border-primary mb-3" style={ { maxWidth: "18rem" } }>
                <h4 className="card-header text-center">Số báo cáo</h4>
                <div className="card-body text-secondary">
                  <h3 className="card-title text-right">6</h3>
                  <h6 className="card-text text-danger text-right">
                    - 2 so với tháng trước
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="card border-primary mb-3" style={ { maxWidth: "18rem" } }>
                <h4 className="card-header text-center">Lượt truy cập</h4>
                <div className="card-body text-secondary">
                  <h3 className="card-title text-right">42</h3>
                  <h6 className="card-text text-danger text-right">
                    + 15 so với tháng trước
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 p-2">
              <h4 className="text-center mb-2">Người dùng mới hàng tháng</h4>
              <LineChart name={ "Người dùng" } chartData={ chartUserData } ></LineChart>
            </div>
            <div className="col-6 p-2">
              <h4 className="text-center mb-2">Bài viết mới hàng tháng</h4>
              <LineChart name={ "Bài viết" } chartData={ chartPostData } ></LineChart>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-6 p-2">
              <h4 className="text-center mb-2">Báo cáo mới hàng tháng</h4>
              <BarChart name={ "Báo cáo" } chartData={ chartReportData }></BarChart>
            </div><div className="col-6 p-2">
              <h4 className="text-center mb-2">Lượt truy cập mới hàng tháng</h4>
              <BarChart name={ "Lượt truy cập" } chartData={ chartAccessData }></BarChart>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default AdminDashboard