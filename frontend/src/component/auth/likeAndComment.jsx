import axios from "axios";

// like and unlike
export const Like = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            await axios.post('/like', req)
        } catch (error) {
            console.log(error)
        }
    }
}

// get all likes of posts
export const getLike = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.get(`/like/getLike/${req}`)
            if (data) {
                return data.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// create comment
export const createComment = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
             await axios.post('/comment', req)
        } catch (error) {
            console.log(error)
        }
    }
}

// get all comment of post
export const getComment = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.get(`/comment/getComment/${req}`)
            if (data) {
                return data.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// delete comment
export const deleteComment = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.delete(`/comment/getComment/${req}`)
            if (data) {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}