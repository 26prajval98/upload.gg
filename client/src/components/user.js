import React, { Component } from 'react'
import { httpGet, httpFile } from '../methods/axios';
import { deleteAll } from '../methods/cookie';
import constant from '../constants';

var initial = {
	username: constant.nil,
	files: constant.nil,
	dis: true,
	file: null
}

export default class user extends Component {
	constructor() {
		super();
		this.state = initial
	}

	fileUpload() {
		httpFile("/uploads", this.state.file)
			.then(res => {
				console.log(res);
				this.setState(initial)
			})
			.catch(err => {
				window.setAlert("Unable to upload. Check upload limit and file size.")
			})
	}

	componentWillMount() {
		var username, files
		httpGet("/users")
			.then(res => {
				username = res.data.username
				return httpGet("/files")
			})
			.then(res => {
				files = res.data.files
				this.setState({
					username,
					files
				})
			})
			.catch(err => {
				console.log(err)
				deleteAll()
			})
	}

	render() {
		var btn = this.state.dis === true ? "w3-disabled" : "";
		btn += " w3-button w3-green"
		return (
			<div>
				<input type="file" name="file" onChange={(e) => { console.log(e.target.files); this.setState({ dis: false, file : e.target.files[0]});}} />
				<button className={btn} onClick={this.fileUpload.bind(this)}>upload</button>
			</div>
		)
	}
}
