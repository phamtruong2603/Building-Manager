import axios from "axios";

// get all post
export const getAllPost = async (page) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            const body = {
                take: 5,
                page: page
            }

            let data = await axios.post('/post/getAllPost', body);
            if (data) {
                return data.data.data
                
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// create post
export const createPost = async (req) => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            let data = await axios.post('/post/createPost', req);
            if(data) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// delete post
export const deletePost = async (postID) => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['authorization'] = `bearer ${token}`;
        try {
            await axios.delete(`/post/deletePost/${postID}`)
        } catch (error) {
            console.log(error)
        }
    }
}

// bài viết được tạo bao nhiêu time trước
//lấy ngày tháng năm hiện tại
export const postingTime = (date) => {
    let currentMin = (new Date()).getMinutes()
    let currentHour = (new Date()).getHours()
    let currentDay = (new Date()).getDate()
    let currentMonth = (new Date()).getMonth()
    let currentYear = (new Date()).getFullYear()

    if (currentYear - date.getFullYear() <= 1) {
        if (currentYear - date.getFullYear() < 1) {
            if (currentMonth - date.getMonth() <= 1) {
                if (currentMonth - date.getMonth() < 1) {
                    if (currentDay - date.getDate() <= 1) {
                        if (currentDay - date.getDate() < 1) {
                            if (currentHour - date.getHours() <= 1) {
                                if (currentHour - date.getHours() < 1) {
                                    return `${currentMin - date.getMinutes()} phút trước`
                                } else {
                                    if (currentMin + (60 - date.getMinutes()) > 60) {
                                        return `${currentHour - date.getHours()} giờ trước`
                                    } else {
                                        return `${currentMin + (60 - date.getMinutes())} phút trước`
                                    }
                                }
                            } else {
                                return `${currentHour - date.getHours()} giờ trước`
                            }
                        } else {
                            if (currentHour + (24 - date.getHours()) > 24) {
                                return `${currentDay - date.getDate()} ngày trước`
                            } else {
                                return `${currentHour + (24 - date.getHours())} giờ trước`
                            }
                        }
                    } else {
                        return `${currentDay - date.getDate()} ngày trước`
                    }
                } else {
                    if (currentDay + (30 - date.getDate()) > 30) {
                        return `${currentMonth - date.getMonth()} tháng trước`
                    } else {
                        return `${currentDay + (30 - date.getDate())} ngày trước`
                    }
                }
            } else {
                return `${currentMonth - date.getMonth()} tháng trước`
            }
        } else {
            if (currentMonth + (12 - date.getMonth()) > 12) {
                return `${currentYear - date.getFullYear()} năm trước`
            } else {
                return `${currentMonth + (12 - date.getMonth())} tháng trước`
            }
        }
    } else {
        return `${currentYear - date.getFullYear()} năm trước`
    }

}
// = currentYear - date.getFullYear() < 1 ?
//     currentMonth - date.getMonth() < 1 ?
//         currentDay - date.getDate() < 1 ?
//             currentHour - date.getHours() < 1 ?
//                 currentMin - date.getMinutes() < 1 ?
//                     `0 phút trước` :
//                     `${currentMin - date.getMinutes()} phút trước` :
//                 `${currentHour - date.getHours()} giờ trước` :
//             `${currentDay - date.getDate()} ngày trước` :
//         `${currentMonth - date.getMonth()} tháng trước` :
//     `${currentYear - date.getFullYear()} năm trước`
