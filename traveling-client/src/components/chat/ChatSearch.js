import React from 'react'

function ChatSearch ()
{
    return (
        <div className="chat-search pt-3 pl-3">
            {/* <div className="d-flex align-items-center">
                <div className="chat-profile mr-3">
                    <img
                        src="images/user/default-avatar.png"
                        alt="chat-user"
                        className="avatar-60 "
                    />
                </div>
                <div className="chat-caption">
                    <h5 className="mb-0">Username</h5>
                    <p className="m-0">Online</p>
                </div>
                <button type="submit" className="close-btn-res p-3">
                    <i className="ri-close-fill" />
                </button>
            </div> */}
            <div className="chat-searchbar mt-4">
                <div className="form-group chat-search-data m-0">
                    <input
                        type="text"
                        className="form-control round"
                        id="chat-search"
                        placeholder="Tìm kiếm..."
                    />
                    <i className="ri-search-line" />
                </div>
            </div>
        </div>
    )
}

export default ChatSearch