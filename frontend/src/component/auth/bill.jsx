import axios from "axios";

// create bill
export const CreateBillID = async (roomID, req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/bill/createBill/${roomID}`, req);
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//get bill
export const getBill = async (roomID, req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post(`/bill/${roomID}`, req);
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//update
export const updateBillID = async (billID, req) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.put(`/bill/${billID}`, req);
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}