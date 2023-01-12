import axios from "axios";

// create conversation
export const CreateConversation = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/chat/conversation/Create`, req)
            if (data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// get all conversation take user
export const getAllConver = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.get(`/chat/conversation/getAll`)
            if (data) {
                return data.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}
// get all users take conversation
export const getUserCV = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/chat/conversation/users`, req)
            if (data) {
                return data.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// create conversation
export const CreateMessage = async (req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/chat/message/Create`, req)
            if (data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// get all message take conversation
export const getAllMes = async (conversationID) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/chat/message/getAll/${conversationID}`)
            if (data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}