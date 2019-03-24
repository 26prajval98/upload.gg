import React, { Component } from 'react'
import constants from '../constants'
import { httpPost } from '../methods/axios'

export default class login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			error: constants.nil
		}
	}

	submit() {
		var data = { ...this.state }

		httpPost("/users/signup", data, 0)
			.then(res => {
				if (res.status !== 200) {
					this.setState({
						error: constants.signup.invalid
					})
					window.setAlert(constants.signup.invalid)
				}
				else {
					this.setState({
						error: constants.nil,
						username: constants.nil,
						password: constants.nil
					})
					window.setAlert(constants.signup.valid)
				}
			})
			.catch(err => {
				window.setAlert(constants.signup.invalid)
			})
	}

	render() {
		return (
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
						<span className="login100-form-title p-b-40">
							Register
                        </span>
						<div className="login100-form validate-form">
							<div className="wrap-input100 validate-input m-b-16">
								<input className="input100" type="text" name="email" placeholder="Email" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} required />
								<span className="focus-input100"></span>
							</div>
							<div className="wrap-input100 validate-input m-b-16">
								<input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} required />
								<span className="focus-input100"></span>
								<span className="symbol-input100"><span className="lnr lnr-lock"></span></span>
							</div>
						</div>
						<div className="container-login100-form-btn p-t-10">
							<button className="login100-form-btn" onClick={(e) => { this.submit() }}>Register</button>
						</div>
					</div>
				</div>
				<div className="text-center w-full p-t-20">
					<a className="txt1 bo1 hov1" href="/login"> Login </a>
				</div>
			</div>
		)
	}
}
