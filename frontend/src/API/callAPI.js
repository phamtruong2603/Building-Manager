import axios from "axios";
import { API_URL } from "../config/config";

export const callApi = async (URL, method = 'get', data) => {
    try {
        const token = localStorage.getItem('token');
        let dataQuery = { data: data };
        if (method === 'get' || method === 'GET') {
            dataQuery = { params: data };
        }
        const response = await axios({
            method: method,
            url: `${API_URL}/${URL}`,
            ...dataQuery,
            headers: {
                // 'Content-Type': 'application/json'
                "Content-Type":"",
                "Authorization": `bearer ${token}`
            }
        });
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const callAPIfromdata = async (URL, method = 'get', data) => {
    try {
        const token = localStorage.getItem('token');
        let dataQuery = { data: data };
        if (method === 'get' || method === 'GET') {
            dataQuery = { params: data };
        }
        const response = await axios({
            method: method,
            url: `${API_URL}/${URL}`,
            ...dataQuery,
            headers: {
                "Content-type": 'multipart/form-data',
                "Authorization": `bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}
