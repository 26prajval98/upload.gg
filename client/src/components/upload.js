import React, { Component } from 'react'
import { httpFile } from '../methods/axios';
import constant from '../constants';

var initial = {
	dis: !constant.bool,
	file: constant.null
}

export default class upload extends Component {

	constructor(props){
		super(props)
		this.state = initial;
	}

	fileUpload() {
		httpFile("/uploads", this.state.file)
			.then(res => {
				this.setState(initial)
				this.props.updateState()
			})
			.catch(err => {
				window.setAlert("Unable to upload. Check upload limit and file size.")
			})
	}

	render() {
		var btn = this.state.dis === true ? "w3-disabled" : "";
		btn += " w3-button w3-green"
		return (
			<div className="w3-col l6 m6 s12 w3-padding-16">
				<div className="w3-container w3-center w3-padding-32">
					<h4 className="w3-padding-32">Upload Files</h4>
					<input type="file" name="file" onChange={(e) => { this.setState({ dis: false, file: e.target.files[0] }); }} />
					<button className={btn} onClick={this.fileUpload.bind(this)}>upload</button>
				</div>
			</div>
		)
	}
}
