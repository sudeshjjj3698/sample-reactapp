import React from 'react'
import {useParams} from 'react-router'

function Chapter() {
    const param=useParams()
    console.log(param)
    return (
        <div>
            chapters
        </div>
    )
}

export default Chapter
