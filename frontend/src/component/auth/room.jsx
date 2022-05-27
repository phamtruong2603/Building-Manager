import axios from "axios";

// get room for the user
export const getRoomDetail = async (id) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.get(`/room/${id}`)
            if (data) {
                return data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// get all the rooms for admin
export const getAllRoom = async () => {
    const token = localStorage.getItem('token')
    if (token) {    
        axios.defaults.headers.common['authorization'] = `bearer ${token}` 
        try {
            let data = await axios.get(`/room`)
            if (data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

//create room
export const createRoom = async (req) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            let data = await axios.post(`/room`, req)
            if (data) {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// delete room
export const deletaRoom = async (id) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`
        try {
            await axios.delete(`/room/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}

//định dạng tiền vnd
export const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });