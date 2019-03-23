import React, { Component } from 'react'
import FileSettings from './filesettings'
import constant from '../constants';
import { httpGet } from '../methods/axios';

var initial = {
	settings: 0
}

export default class file extends Component {
	constructor(props) {
		super(props)
		this.state = initial
	}

	deletefile = (fid) => {
		window.setLoading()
		var deletePath = "/files/delete/" + fid;
		httpGet(deletePath)
			.then(res => {
				console.log(res)
				window.setAlert(constant.files.delete.success);
				this.props.updateState()
			})
			.catch(err => {
				window.unsetLoading()
				window.setAlert(constant.ise);
			})
	}

	showSettings() {
		this.setState({
			settings: 1
		})
	}

	display(){
		if (this.state.settings)
			return <FileSettings fid={this.props.fid} shared={this.props.shared} public={this.props.ispublic} close={this.closeSettings.bind(this)} />
	}

	closeSettings() {
		this.setState({
			settings: 0
		})
		this.props.updateState()
	}

	render() {
		var downURL = constant.baseurl + '/files/download/' + this.props.fid;
		return (
			<div className="w3-panel">
				<div className="w3-bar">
					<span className="w3-bar-item w3-margin">{this.props.fname}</span>
					<a href={downURL} className="w3-button w3-green w3-bar-item w3-margin">Download</a>
					<button onClick={this.deletefile.bind(this, this.props.fid)} className="w3-button w3-red w3-bar-item w3-margin">Delete</button>
					<button onClick={this.showSettings.bind(this)} className="w3-button w3-blue w3-bar-item w3-margin">File Options</button>
					{
						this.display()
					}
				</div>
			</div>
		)
	}
}
