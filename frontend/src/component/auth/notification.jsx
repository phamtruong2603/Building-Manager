import axios from "axios";

export const getNoti = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            const data = await axios.get('/notification')
            if (data) {
                return data.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const postNoti = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            console.log(req)
            await axios.post('/notification', req)
        } catch (error) {
            console.log(error)
        }
    }
}