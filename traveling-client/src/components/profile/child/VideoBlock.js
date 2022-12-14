import React from 'react'

function VideoBlock ( { video } )
{
    return (
        <div className="user-images d-flex justify-content-center text-center w-100 border">
            <div className="embed-responsive embed-responsive-16by9">
                <video
                    title="video"
                    className="embed-responsive-item"
                    src={ video?.path }
                    controls
                />
            </div>
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
            <a
                href="/"
                className="image-edit-btn"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Edit or Remove"
            >
                <i className="ri-edit-2-fill" />
            </a> */}
        </div>

    )
}

export default VideoBlock