import React from 'react'

function Loading ()
{
    return (
        <div className="col-sm-12 text-center">
            <img
                src="images/page-img/page-load-loader.gif"
                alt="loader"
                style={ { height: 100 } }
            />
        </div>
    )
}

export default Loading