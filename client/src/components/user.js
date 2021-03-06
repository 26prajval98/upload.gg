import React, { Component } from 'react'
import { httpGet } from '../methods/axios';
import { deleteAll } from '../methods/cookie';
import constant from '../constants';
import File from './file'
import '../css/loader.css'
import Upload from './upload'
import rocket from '../images/home/rocket.png'

var initial = {
	loading: !constant.bool,
	username: constant.nil,
	files: constant.arr,
	type: "S"
}

export default class user extends Component {
	constructor() {
		super();
		this.state = initial
	}

	updateState() {
		var username, files, type
		httpGet("/users")
			.then(res => {
				type = res.data.type[0]
				console.log(type)
				username = res.data.username
				return httpGet("/files")
			})
			.then(res => {
				files = res.data.files
				this.setState({
					type,
					username,
					files
				})
				this.setState({
					loading: false
				})
			})
			.catch(err => {
				// deleteAll()
			})
	}

	switchPlan() {
		window.setLoading()
		var type = this.state.type === 'S' ? 'P' : 'S';
		httpGet('/users/update/type/' + type)
			.then(res => {
				this.updateState()
			})
			.catch(err => {
				window.setAlert(constant.ise)
			})
	}

	setLoading() {
		this.setState({
			loading: true
		})
	}

	unsetLoading() {
		this.setState({
			loading: false
		})
	}

	componentWillMount() {
		this.updateState()
		window.setLoading = this.setLoading.bind(this)
		window.unsetLoading = this.unsetLoading.bind(this)
	}

	loaded() {
		if (!this.state.loading) {
			var type = this.state.type === 'S' ? 'Standard' : 'Premium';
			return (
				<div className="w3-row">
					<div className="w3-container">
						<h1 className="w3-xxlarge" style={{ display: "inline" }}>Hello, {this.state.username}</h1>
						<button className="w3-button w3-purple w3-right w3-large w3-margin" onClick={() => { deleteAll(); window.location = "/"; }}>Logout</button>
						<button className="w3-button w3-teal w3-right w3-large w3-margin" onClick={() => { this.switchPlan(); }}>Switch Plan</button>
						<h1 className="w3-xxlarge">Current Plan : {type}</h1>
					</div>
					<Upload updateState={this.updateState.bind(this)} />
					<div className="w3-col l6 m6 s12 w3-padding-16">
						<div className="w3-container w3-center w3-padding-32">
							<h4 className="w3-padding-32">Uploaded Files</h4>
							{
								this.state.files.map((file, i) => {
									var fname = file.name;
									var fid = file._id;
									var ispublic = file.isPublic;
									var shared = file.shared;
									return (
										<File fname={fname} updateState={this.updateState.bind(this)} fid={fid} ispublic={ispublic} shared={shared} key={fid} />
									)
								})
							}
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="w3-display-container" style={{ width: "100vw", height: "100vh" }}>
					<div className="w3-display-middle loading-rocket w3-center">
						<img src={rocket} alt="rocket" />
						<p className="w3-jumbo">Loading...</p>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div className="w3-container">
				{
					this.loaded()
				}
			</div>
		)
	}
}
