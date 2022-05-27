import axios from "axios";

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case "login":
            return payload.data
        case "update":
            return payload
        default: return state;
    }
}

// gửi dữ liệu đăng nhập . nhận về thông tin 
export const loginForm = async (req) => {
    try {
        let data = await axios.post('/login', req)
        localStorage.setItem('token', data.data.token)
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

//lấy dữ liệu user/admin tự động khi có token
export const getUser = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.get('/user')
            if (data) {
                return data
            }
        } catch (error) {
            localStorage.removeItem('token')
            console.log(error)
        }
    }
}

// lấy toàn bộ dự liệu user/admin
export const getDetailUser = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.get('/detailUser')
            if (data) {
                return data.data.data
            }
        } catch (error) {
            localStorage.removeItem('token')
            console.log(error)
        }
    }
}

//change user data
export const updateDetailUser = async (req) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.put('/updateUser', req)
            if(data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//change the password
export const ChangePassword = async (req) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.put('/changePW', req)
            if(data) {
                return data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// delete User
export const deleteUser = async(req) => {
    const token = localStorage.getItem('token');
    if(token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            await axios.delete(`/deleteUser/${req}`, )
        } catch (error) {
            console.log(error)
        }
    }
}