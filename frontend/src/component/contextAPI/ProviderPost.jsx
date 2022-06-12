import React, { useRef, useState } from 'react';

export const ProviderPosts = React.createContext()

const ProviderPost = ({ children }) => {

    const [posts, setPosts] = useState([])
    const page = useRef(0)

    const data = { posts, setPosts, page }

    return (
        <ProviderPosts.Provider value={data}>
            {children}
        </ProviderPosts.Provider>
    )
}

export default ProviderPost