import React from 'react'

export const PostContext = React.createContext();

export const PostProvider = ({ children }) => {
    const [post, setPost] = React.useState();
    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    )
}