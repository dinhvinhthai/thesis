import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import Layout from '../components/common/Layout'
import BlockLine from '../components/setting/BlockLine'
import { ToastContext } from '../App';

function Setting ()
{
    const notify = useContext( ToastContext );
    const loginData = JSON.parse( localStorage.getItem( "userData" ) );
    const [ oldPassword, setOldPassword ] = useState();
    const [ newPassword, setNewPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ alert, setAlert ] = useState( "" );
    const [ blockData, setBlockData ] = useState();
    const [ refresh, setRefresh ] = useState( false );

    const handleChangePassword = async ( e ) =>
    {
        e.preventDefault();
        setAlert( "" );
        if ( newPassword !== confirmPassword )
        {
            setAlert( "Nhập lại mật khẩu không chính xác." );
        }
        else if ( newPassword.length < 8 || !newPassword.match( /[A-Z]+/ ) || !newPassword.match( /[0-9]+/ ) || !newPassword.match( /[$@#&!]+/ ) )
        {
            setAlert( "Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự in hoa và 1 kí tự đặc biệt." )
        }
        else
        {
            var password = [ oldPassword, newPassword ];
            await axios.post( "http://localhost:8080/api/user/changePassword/" + loginData?.userId,
                password
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem( "token" )
                    }
                } )
                .then( ( res ) =>
                {
                    notify( res.data, "success" );
                    setAlert( "" );
                    setOldPassword( "" );
                    setNewPassword( "" );
                    setConfirmPassword( "" );
                } )
                .catch( ( err ) =>
                {
                    setAlert( err.response.data );
                    setOldPassword( "" );
                    setNewPassword( "" );
                    setConfirmPassword( "" );
                } );
        }

    };

    const handleGetBlockUser = async () =>
    {
        await axios.get( "http://localhost:8080/api/block/getByUSerId/" + loginData?.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setBlockData( res.data );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    useEffect( () =>
    {
        handleGetBlockUser();
    }, [ refresh ] )

    return (
        <React.Fragment>
            <Layout></Layout>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div
                                className="iq-card position-relative inner-page-bg bg-primary"
                                style={ { height: 100 } }
                            >
                                <div className="inner-page-title">
                                    <h3 className="text-white">Cài đặt và quyền riêng tư</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Đổi mật khẩu</h4>
                                    </div>
                                </div>
                                <div className="col-6 mx-auto">
                                    <div className="iq-card-body">
                                        { alert ? <div class="alert alert-danger" role="alert">
                                            <div class="iq-alert-text">{ alert }</div>
                                        </div> : <></> }
                                        <form onSubmit={ ( e ) => handleChangePassword( e ) }>
                                            <div className="form-group">
                                                <label htmlFor="old-password">Mật khẩu cũ:</label>
                                                <input type="password"
                                                    className="form-control"
                                                    id="old-password"
                                                    onChange={ ( e ) => { setOldPassword( e.target.value ) } }
                                                    value={ oldPassword }
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="new-password">Mật khẩu mới:</label>
                                                <input type="password"
                                                    className="form-control"
                                                    id="new-password"
                                                    onChange={ ( e ) => { setNewPassword( e.target.value ) } }
                                                    value={ newPassword }
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="confirm-password">Nhập lại mật khẩu mới:</label>
                                                <input type="password"
                                                    className="form-control"
                                                    id="confirm-password"
                                                    onChange={ ( e ) => { setConfirmPassword( e.target.value ) } }
                                                    value={ confirmPassword }
                                                    required
                                                />
                                            </div>
                                            <div className="w-100 text-center">
                                                <button type="submit" className="btn btn-primary m-2">
                                                    Xác nhận
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Chặn người dùng</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <p className="ml-2">
                                        Danh sách người dùng đã bị chặn.
                                    </p>
                                    <div className="col-6 mx-auto">
                                        { blockData?.map( ( data, index ) => (
                                            <BlockLine data={ data } refresh={ refresh } setRefresh={ setRefresh }></BlockLine>
                                        ) ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Setting