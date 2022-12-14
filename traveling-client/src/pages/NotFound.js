import React from 'react'
import { Link } from 'react-router-dom'

function NotFound ()
{
    return (
        <div className="text-center mt-5">
            <div className="error-page m-5">
                <div>
                    <h1 data-h1={ 404 }>404</h1>
                    <h1 data-p="NOT FOUND">NOT FOUND</h1>
                </div>
            </div>
            <Link to="/" className="back">
                GO BACK
            </Link>
        </div>
    )
}

export default NotFound