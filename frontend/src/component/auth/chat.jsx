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