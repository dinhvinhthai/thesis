import React from 'react'
import GroupBlock from '../components/group/GroupBlock'
import Leftbar from '../components/common/Leftbar'
import Navbar from '../components/common/Navbar'
import Rightbar from '../components/common/Rightbar'
import Layout from '../components/common/Layout'

function YourGroup ()
{
    return (
        <React.Fragment>
            <Layout></Layout>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img
                        src="images/page-img/profile-bg7.jpg"
                        className="img-fluid w-100 rounded rounded"
                        alt="header-bg"
                    />
                    <div className="title-on-header">
                        <div className="data-block">
                            <h2>Hội nhóm</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <GroupBlock></GroupBlock>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default YourGroup