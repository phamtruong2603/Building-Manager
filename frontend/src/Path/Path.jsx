import React from 'react'

const Path = () => {
    let paths = (window.location.pathname).split("/")
    let pathArray = []

    //   paths.map((list, index) => {
    //     if (list !== '') {
    //       return (
    //         pathArray.push(list)
    //       )
    //     }

    //   })

    paths.filter((list) => {
        if (list !== '') {
            pathArray.push(list)
        }
        return pathArray;
    })
    console.log(pathArray)
    return (
        <div>
            {/* {pathArray.map((list, index) => {
        return (
          <div key={index}>{list}/</div>
        )
      })} */}
        </div>
    )
}

export default Path