import axios from "axios"
import qs from "querystring"
import { getCookie } from './cookie'

import constants from '../constants'

var url = constants.baseurl;

const httpGet = (path) => {
	if (getCookie("uploadgg"))
		return axios.get(url + path, {
			headers: {
				Authorization: "Bearer " + getCookie("uploadgg"),
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	else
		window.location = "/"
}

const httpDelete = (path) => {
	return axios.delete(url + path, {
		headers: {
			'Authorization': "Bearer " + getCookie("uploadgg"),
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

const httpPost = (path, data, auth) => {
	if (auth)
		return axios.post(url + path, qs.stringify(data), {
			headers: {
				'Authorization': "Bearer " + getCookie("uploadgg"),
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	else
		return axios.post(url + path, qs.stringify(data), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
}

const httpFile = (path, data) => {

	var formData = new FormData()
	formData.append("file", data)
	return axios.post(url + path, formData, {
		onUploadProgress : (e)=>{
			console.log(e)
		},
		headers: {
			'Authorization': "Bearer " + getCookie("uploadgg"),
			'Content-Type': 'multipart/form-data'
		}
	})
}

export {
	httpGet,
	httpPost,
	httpDelete,
	httpFile
}