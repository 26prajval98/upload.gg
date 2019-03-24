import React, { Component } from 'react'
import { httpPost } from '../methods/axios';
import constant from '../constants';
import rocket from '../images/home/rocket.png'

var returnInitial = (props) => {
	return {
		loading: false,
		public: props.public,
		shared: [...props.shared],
		email: constant.nil
	}
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export default class filesettings extends Component {
	constructor(props) {
		super(props)
		this.state = returnInitial({ loading: true, public: false, shared: [], email: "" })
	}

	componentWillMount() {
		this.setState(returnInitial(this.props))
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

	makePublic() {
		this.setLoading()
		httpPost("/files/makepublic/" + this.props.fid, { isPublic: !this.props.public }, 1)
			.then(res => {
				this.setState({
					public: !this.state.public
				})
				this.unsetLoading()
			})
			.catch(err => {
				window.setAlert(constant.ise)
			})
	}

	changeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	shareEmail() {
		this.setLoading()
		if (validateEmail(this.state.email)) {
			var email = this.state.email;
			httpPost("/files/share/" + this.props.fid, { email: email }, 1)
				.then(res => {
					var shared = [...this.state.shared];
					if (!(shared.indexOf(email) + 1)) {
						shared.push(email);
						this.setState({ shared, email: "" });
					}
					this.unsetLoading()
				})
				.catch(err => {
					window.setAlert(constant.ise)
					this.unsetLoading()
				})
		}
		else {
			window.setAlert(constant.nem)
			this.unsetLoading()
		}
	}


	unshareEmail(email) {
		this.setLoading()
		var shared = [...this.state.shared];
		httpPost("/files/unshare/" + this.props.fid, { email: email }, 1)
			.then(res => {
				var index = shared.indexOf(email);
				if (index + 1) {
					shared.splice(index, 1);
					this.setState({
						shared
					})
				}
				this.unsetLoading()
			})
			.catch(err => {
				window.setAlert(constant.ise)
				this.unsetLoading()
			})
	}

	showFileSettings() {
		if (this.state.loading)
			return (
				<div className="w3-show w3-modal">
					<div className="w3-modal-content w3-display-container" style={{ height: "25vw", backgroundColor: "rgba(0,0,0,0)" }}>
						<div className="loading-rocket w3-display-middle">
							<img src={rocket} alt="rocket" />
							<p className="w3-jumbo">Loading...</p>
						</div>
					</div>
				</div>
			)
		else
			return (
				<div className="w3-show w3-modal">
					<div className="w3-modal-content">
						<header className="w3-container w3-purple w3-padding">
							<span className="w3-button w3-display-topright" onClick={() => { this.props.close() }}>&times;</span>
							<h2>File Options</h2>
						</header>
						<div className="w3-container w3-padding">
							<h5 className="w3-margin">
								Public : <input type="checkbox" className="w3-check" checked={this.state.public} onChange={this.makePublic.bind(this)} />
							</h5>
							<div className="w3-container">
								<h5 className="w3-margin" style={{ display: "inline" }}>Shareable link</h5>
								<input className="w3-input w3-center" value={constant.baseurl + "/files/" + this.props.fid} readOnly style={{ width: "50%", display: "inline" }} />

							</div>
							<h5 className="w3-margin">File Shared With</h5>
							<div className="w3-container w3-bar-block w3-margin">
								<div className="w3-row w3-margin">
									<div className="w3-col l10 m9 s8">
										<input type="email" value={this.state.email} placeholder="Enter email you want to share here" onChange={this.changeEmail.bind(this)} className="w3-input" />
									</div>
									<div className="w3-col l2 m3 s4">
										<button className="w3-button w3-circle w3-green w3-right" onClick={this.shareEmail.bind(this)}>+</button>
									</div>
								</div>
								{
									this.state.shared.map((e, i) => {
										return (
											<div className="w3-row w3-margin" key={i}>
												<div className="w3-col l10 m9 s8">
													{e}
												</div>
												<div className="w3-col l2 m3 s4">
													<button onClick={this.unshareEmail.bind(this, e)} className="w3-red w3-button w3-right w3-circle">&times;</button>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			)
	}

	render() {
		return (
			<div className="w3-container" style={{ margin: "0px" }}>
				{this.showFileSettings()}
			</div>
		)
	}
}