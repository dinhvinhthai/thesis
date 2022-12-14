import React from 'react'
import { Link } from 'react-router-dom'
import PopupModal from '../../common/modal/PopupModal'
import PopupPostModal from '../../common/modal/PopupPostModal'

function ImageBlock ( { image } )
{
    return (
        <React.Fragment>
            <PopupModal data={ image } />
            <div className="user-images d-flex justify-content-center text-center">
                <img data-toggle="modal" data-target={ "#popup-modal-" + image?.imageId }
                    style={ { height: "300px", width: "300px", objectFit: "cover" } }
                    src={ image?.path }
                    className="btn img-fluid rounded"
                    alt="Responsive img"
                />
                {/* <div className="image-hover-data">
                <div className="product-elements-icon">
                    <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                            <a href="/" className="pr-3 text-white">
                                { " " }
                                60 <i className="ri-thumb-up-line" />{ " " }
                            </a>
                        </li>
                        <li>
                            <a href="/" className="pr-3 text-white">
                                { " " }
                                30 <i className="ri-chat-3-line" />{ " " }
                            </a>
                        </li>
                        <li>
                            <a href="/" className="pr-3 text-white">
                                { " " }
                                10 <i className="ri-share-forward-line" />{ " " }
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Link
                to={ "/" }
                className="image-edit-btn"
                data-toggle="tooltip"
                data-placement="top"
                data-original-title="Edit or Remove"
            >
                <i className="ri-edit-2-fill" />
            </Link> */}
            </div>
        </React.Fragment>

    )
}

export default ImageBlock