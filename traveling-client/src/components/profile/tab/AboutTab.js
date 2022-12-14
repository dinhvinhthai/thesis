import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as SystemConst from "../../../constant/SystemConst"

function AboutTab ( { userData, refresh, setRefresh } )
{
    const [ name, setName ] = useState( userData?.name );
    const [ gender, setGender ] = useState( userData?.gender );
    const [ birthday, setBirthday ] = useState( userData?.birthday );
    const [ job, setJob ] = useState( userData?.job );
    const [ country, setCountry ] = useState( userData?.country );
    const [ phone, setPhone ] = useState( userData?.phone );
    const [ address, setAddress ] = useState( userData?.address );
    const [ story, setStory ] = useState( userData?.story );

    const loginId = JSON.parse( localStorage.getItem( "userData" ) )?.userId;
    const [ showEditBasic, setShowEditBasic ] = useState( false );
    const [ showEditContract, setShowEditContract ] = useState( false );
    const [ showEditBio, setShowEditBio ] = useState( false );
    const param = useParams();

    const convertBirthDate = ( time ) =>
    {
        var date = new Date( time );
        return date.toLocaleDateString( 'en-GB' );
    }

    const handleUpdateBasic = () =>
    {
        axios.post( "http://localhost:8080/api/user/update", {
            userId: loginId,
            name,
            gender,
            birthday,
            job,
            country
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setRefresh( !refresh );
                setShowEditBasic( false );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleUpdateContract = () =>
    {
        axios.post( "http://localhost:8080/api/user/update", {
            userId: loginId,
            phone,
            address
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setShowEditContract( false );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    const handleUpdateStory = () =>
    {
        axios.post( "http://localhost:8080/api/user/update", {
            userId: loginId,
            story
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem( "token" )
                }
            } )
            .then( ( res ) =>
            {
                setShowEditBio( false );
                setRefresh( !refresh );
            } )
            .catch( ( err ) =>
            {
                console.log( err.response );
            } );
    };

    return (
        <div className="tab-pane fade" id="about" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                    <div className="row">
                        <div class="col-3">
                            <ul class="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
                                <li>
                                    <a class="nav-link active" data-toggle="pill" href="#basic">Thông tin cơ bản</a>
                                </li>
                                <li>
                                    <a class="nav-link" data-toggle="pill" href="#contract">Liên hệ</a>
                                </li>
                                <li>
                                    <a class="nav-link" data-toggle="pill" href="#bio">Tiểu sử</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-8 mx-auto">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="basic" role="tabpanel">
                                    { !showEditBasic ?
                                        <>
                                            <div>
                                                { param?.userId == loginId &&
                                                    <div className="btn float-right" onClick={ () => setShowEditBasic( true ) }>
                                                        <i className="ri-edit-line mr-2" />
                                                        Cập nhật
                                                    </div>
                                                }
                                                <h4 className="mt-3">Thông tin cơ bản</h4>
                                            </div>
                                            <hr />
                                            <form className="form-horizontal px-5 pt-3">
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Họ và tên:
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <p className="align-self-center mb-0">{ name ? name : userData?.name }</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Ngày sinh:
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <p className="align-self-center mb-0">{ birthday ? convertBirthDate( birthday ) : convertBirthDate( userData?.birthday ) }</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Giới tính
                                                    </label>
                                                    <div className="form-check col-sm-9">
                                                        <p className="align-self-center mb-0">{ userData?.gender === SystemConst.MALE ? "Nam" : userData?.gender === SystemConst.FEMALE ? "Nữ" : "Khác" }</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="job"
                                                    >
                                                        Nghề nghiệp
                                                    </label>
                                                    <div className="form-check col-sm-9">
                                                        <p className="align-self-center mb-0">{ userData?.job ? userData?.job : "Chưa thiết lập" }</p>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="job"
                                                    >
                                                        Quê quán
                                                    </label>
                                                    <div className="form-check col-sm-9">
                                                        <p className="align-self-center mb-0">{ userData?.country ? userData?.country : "Chưa thiết lập" }</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <hr /> </> :
                                        <> <div>
                                            <div className="btn float-right" onClick={ () =>
                                            {
                                                handleUpdateBasic()
                                            } }>
                                                <i className="ri-save-3-line mr-2" />
                                                Lưu
                                            </div>
                                            <div className="btn float-right" onClick={ () => setShowEditBasic( false ) }>
                                                <i className="ri-arrow-go-back-line"></i>
                                                Hoàn tác
                                            </div>
                                            <h4 className="mt-3">Thông tin cơ bản</h4>
                                        </div>
                                            <hr />
                                            <form className="form-horizontal px-5 pt-3">
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Họ và tên:
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="name"
                                                            className="form-control"
                                                            id="name"
                                                            onChange={ ( e ) => { setName( e.target.value ) } }
                                                            value={ name ? name : userData?.name }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Ngày sinh:
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="birthday"
                                                            onChange={ ( e ) => { setBirthday( e.target.value ) } }
                                                            value={ birthday ? birthday : userData?.birthday }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="text"
                                                    >
                                                        Giới tính
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select className="form-control"
                                                            value={ gender ? gender : userData?.gender } onChange={ ( e ) =>
                                                            {
                                                                setGender( e.target.value );
                                                            } }
                                                            required>
                                                            <option value="0">Nam</option>
                                                            <option value="1">Nữ</option>
                                                            <option value="2">Khác</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="job"
                                                    >
                                                        Nghề nghiệp
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="job"
                                                            placeholder="Chưa thiết lập"
                                                            onChange={ ( e ) => { setJob( e.target.value ) } }
                                                            value={ job ? job : userData?.job }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="job"
                                                    >
                                                        Quê quán
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="job"
                                                            placeholder="Chưa thiết lập"
                                                            onChange={ ( e ) => { setCountry( e.target.value ) } }
                                                            value={ country ? country : userData?.country }
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                            <hr />
                                        </> }
                                </div>

                                <div className="tab-pane fade" id="contract" role="tabpanel">
                                    { !showEditContract ? <>
                                        <div>
                                            { param?.userId == loginId &&
                                                <div className="btn float-right" onClick={ () => setShowEditContract( true ) }>
                                                    <i className="ri-edit-line mr-2" />
                                                    Cập nhật
                                                </div>
                                            }

                                            <h4 className="mt-3">Liên hệ</h4>
                                        </div>
                                        <hr />
                                        <form className="form-horizontal px-5 pt-3">
                                            <div className="form-group row pb-2">
                                                <label
                                                    className="control-label col-sm-3 align-self-center mb-0"
                                                    htmlFor="text"
                                                >
                                                    Số điện thoại
                                                </label>
                                                <div className="col-sm-9">
                                                    <p className="align-self-center mb-0">{ userData?.phone ? userData?.phone : "Chưa thiết lập" }</p>
                                                </div>
                                            </div>
                                            <div className="form-group row pb-2">
                                                <label
                                                    className="control-label col-sm-3 align-self-center mb-0"
                                                    htmlFor="text"
                                                >
                                                    Địa chỉ
                                                </label>
                                                <div className="form-check col-sm-9">
                                                    <p className="align-self-center mb-0">{ userData?.address ? userData?.address : "Chưa thiết lập" }</p>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                    </>
                                        :
                                        <>
                                            <div>
                                                <div className="btn float-right" onClick={ () =>
                                                {
                                                    handleUpdateContract()
                                                } }>
                                                    <i className="ri-save-3-line mr-2" />
                                                    Lưu
                                                </div>
                                                <div className="btn float-right" onClick={ () => setShowEditContract( false ) }>
                                                    <i className="ri-arrow-go-back-line"></i>
                                                    Hoàn tác
                                                </div>
                                                <h4 className="mt-3">Liên hệ</h4>
                                            </div>
                                            <hr />
                                            <form className="form-horizontal px-5 pt-3">
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="phone"
                                                    >
                                                        Số điện thoại
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="phone"
                                                            placeholder="Chưa thiết lập"
                                                            onChange={ ( e ) => { setPhone( e.target.value ) } }
                                                            value={ phone ? phone : userData?.phone }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-2">
                                                    <label
                                                        className="control-label col-sm-3 align-self-center mb-0"
                                                        htmlFor="address"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="address"
                                                            placeholder="Chưa thiết lập"
                                                            onChange={ ( e ) => { setAddress( e.target.value ) } }
                                                            value={ address ? address : userData?.address }
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                            <hr />
                                        </> }
                                </div>
                                <div className="tab-pane fade" id="bio" role="tabpanel">
                                    { !showEditBio ? <>
                                        <div>

                                            { param?.userId == loginId &&
                                                <div className="btn float-right" onClick={ () => setShowEditBio( true ) }>
                                                    <i className="ri-edit-line mr-2" />
                                                    Cập nhật
                                                </div>
                                            }
                                            <h4 className="mt-3">Tiểu sử</h4>
                                        </div>
                                        <hr />
                                        <form className="form-horizontal px-5 pt-3">
                                            <p className="text-justify">
                                                { userData?.story ? userData?.story : "Chưa thiết lập" }
                                            </p>
                                        </form>
                                        <hr />
                                    </> : <>
                                        <div>
                                            <div className="btn float-right" onClick={ () =>
                                            {
                                                handleUpdateStory()
                                            } }>
                                                <i className="ri-save-3-line mr-2" />
                                                Lưu
                                            </div>
                                            <div className="btn float-right" onClick={ () => setShowEditBio( false ) }>
                                                <i className="ri-arrow-go-back-line"></i>
                                                Hoàn tác
                                            </div>
                                            <h4 className="mt-3">Tiểu sử</h4>
                                        </div>
                                        <hr />
                                        <form className="form-horizontal pt-3">

                                            <div>
                                                <textarea class="form-control" id="bio" rows="10" placeholder="Chưa thiết lập"
                                                    value={ story ? story : userData?.story } onChange={ ( e ) => { setStory( e.target.value ) } } ></textarea>
                                            </div>
                                        </form>
                                        <hr />
                                    </> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </div >

    )
}

export default AboutTab