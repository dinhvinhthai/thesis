import React from 'react'
import Layout from '../components/common/Layout'
import FriendsContent from '../components/friends/FriendsContent'


function Friends ()
{
    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <FriendsContent></FriendsContent>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Friends