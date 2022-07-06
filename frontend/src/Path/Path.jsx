import React from 'react'

const Path = () => {
    let paths = (window.location.pathname).split("/")
    let pathArray = []

    paths.filter((list) => {
        if (list !== '') {
            pathArray.push(list)
        }
        return pathArray;
    })
    console.log(pathArray)
    return (
        <div>
           
        </div>
    )
}

export default Path