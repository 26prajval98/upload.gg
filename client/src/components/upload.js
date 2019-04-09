import React, { Component } from 'react'
import { httpFile } from '../methods/axios';
import constant from '../constants';
import '../css/drag.css'
import uploadImg from '../images/upload.png'

var initial = {
	file: constant.null,
	showprogress: false,
	progress: 0
}

export default class upload extends Component {

	constructor(props) {
		super(props)
		this.state = initial;
	}

	progress(x) {
		if (x < 0.999999)
			this.setState({
				progress: x,
				showprogress: true
			})
		else {
			this.setState({
				progress: 0,
				showprogress: false
			})
			window.setAlert(constant.upload.success)
		}
	}

	showProgress() {
		if (this.state.showprogress) {
			var progress = parseInt(this.state.progress * 100) + "%"
			return (
				<div className="w3-container w3-center">
					<div className="w3-border" style={{ width: "80%", height: "40px", margin: "auto", marginTop: "40px" }}>
						<div className="w3-green" style={{ width: progress, height: "40px" }} />
						<h6 className=" w3-xlarge w3-center">{progress}</h6>
					</div>
				</div>
			)

		}
	}

	addFile(e) {
		e.preventDefault();
		this.setState({ file: e.dataTransfer.files[0] });
	}

	fileUpload() {
		httpFile("/uploads", this.state.file, this.progress.bind(this))
			.then(res => {
				this.setState(initial)
				this.props.updateState()
			})
			.catch(err => {
				window.setAlert(constant.upload.unsuccess)
			})
	}

	displayFile() {
		if (!this.state.file) {
			return (
				<div className="w3-center">
					<img src={uploadImg} alt="Click here or drag to upload" style={{ width: "100%" }} />
				</div>
			)
		}
		else {
			return (
				<div className="w3-display-middle">
					{
						this.state.file.name
					}
				</div>
			)
		}
	}

	removeFile() {
		this.setState({
			file: null
		})
		window.location.reload()
	}

	componentDidMount() {
		this.refs.divs.addEventListener('click', () => {
			this.refs.input.click()
		})
	}


	render() {
		var btn = this.state.file === null ? "w3-hide" : "";
		var greenbtn = btn + " w3-button w3-green"
		var redbtn = btn + " w3-button w3-red"
		return (
			<div className="w3-col l6 m6 s12 w3-padding-16">
				<div className="w3-container w3-center w3-padding-32 w3-center">
					<h4 className="w3-padding-32">Upload Files</h4>
					<div className="drop_zone w3-display-container" ref="divs" style={{ margin: "auto", cursor: "pointer" }} onDrop={this.addFile.bind(this)} onDragOver={(e) => { e.stopPropagation(); e.preventDefault() }}>
						{
							this.displayFile()
						}
						<label>
							<input type="file" name="file" ref="input" style={{ visibility: "hidden" }} onChange={(e) => { this.setState({ file: e.target.files[0] }); }} />
						</label>
					</div>
					<button className={`${greenbtn} w3-margin`} onClick={this.fileUpload.bind(this)}>Upload</button>
					<button className={`${redbtn} w3-margin`} onClick={this.removeFile.bind(this)}>Remove</button>
					{
						this.showProgress()
					}
				</div>
			</div>
		)
	}
}
