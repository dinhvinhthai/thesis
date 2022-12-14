import React from 'react'
import { Link } from 'react-router-dom'

function PopupPostModal ( { data } )
{
    return (
        <div
            className="modal fade"
            id={ "popup-post-modal-" + data?.postId }
            tabIndex={ -1 }
            role="dialog"
            aria-hidden="true"
        >

            <div className="modal-dialog modal-dialog-centered modal-xl p-4" role="document">
                <div className="modal-content w-100">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div
                            id={ "post-img-" + data?.postId }
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                { data?.images && data?.images?.map( ( img, index ) => (
                                    index == 0 ?
                                        <div className={ "carousel-item active" } key={ index }  >
                                            <h5 className="text-center mb-2">{ index + 1 }/{ data?.images?.length }</h5>
                                            <img
                                                style={ {
                                                    maxHeight: "700px",
                                                    objectFit: "contain"
                                                    // backgroundColor: "#03030a"
                                                } }
                                                src={ img?.path }
                                                alt="post-img"
                                                className="img-fluid rounded w-100"
                                            />
                                        </div> :
                                        <div className={ "carousel-item" } key={ index }  >
                                            <h5 className="text-center mb-2">{ index + 1 }/{ data?.images?.length }</h5>
                                            <img
                                                style={ {
                                                    maxHeight: "700px",
                                                    objectFit: "contain"
                                                    // backgroundColor: "#03030a"
                                                } }
                                                src={ img?.path }
                                                alt="post-img"
                                                className="img-fluid rounded w-100"
                                            />
                                        </div>
                                ) ) }
                            </div>
                            { data?.images?.length > 1 &&
                                <>
                                    <div
                                        className="btn carousel-control-prev"
                                        href={ "#post-img-" + data?.postId }
                                        role="button"
                                        data-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        <span className="sr-only">Previous</span>
                                    </div>
                                    <div
                                        className="btn carousel-control-next"
                                        href={ "#post-img-" + data?.postId }
                                        role="button"
                                        data-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true" />
                                        <span className="sr-only">Next</span>
                                    </div>
                                </> }

                        </div>


                    </div>
                </div>
            </div>
        </div >
    )
}

export default PopupPostModal