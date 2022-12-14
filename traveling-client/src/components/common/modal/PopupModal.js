import React from 'react'

function PopupModal ( { data } )
{
    return (
        <div
            className="modal fade"
            id={ "popup-modal-" + data?.imageId }
            tabIndex={ -1 }
            role="dialog"
            aria-hidden="true"
        >

            <div className="modal-dialog modal-dialog-centered modal-xl p-4 w-auto" role="document">
                <div className="modal-content">
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
                    <div className="modal-body text-center">
                        <img
                            style={ {
                                maxHeight: "700px",
                                objectFit: "contain"
                            } }
                            src={ data?.path }
                            className="img-fluid rounded"
                            alt="Responsive img"
                        />

                    </div>
                </div>
            </div>
        </div >
    )
}

export default PopupModal