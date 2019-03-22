import axios from "axios"
import qs from "querystring"

import constants from './constants'

var url = constants.baseurl;

const httpGet = (path) => {
    return axios.get(url + path, {
        headers: {
            // Authorization: "Bearer " + getCookie("token"),
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

const httpDelete = (path) => {
    return axios.delete(url + path, {
        headers: {
            // 'Authorization': "Bearer " + getCookie("token"),
            'cache-control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

const httpPost = (path, data, auth) => {
    if (auth)
        return axios.post(url + path, qs.stringify(data), {
            headers: {
                // 'Authorization': "Bearer " + getCookie("token"),
                'cache-control': null,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    else
        return axios.post(url + path, qs.stringify(data), {
            headers: {
                'cache-control': null,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
}

const httpImage = (name, data) => {

    var formData = new FormData()
    formData.append("imageFile", data)

    return axios.post("https://localhost:8000/images?name=" + name, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export {
    httpGet,
    httpPost,
    httpDelete,
    httpImage
}