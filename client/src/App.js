import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import component from './components'
import constant from './constants';
class App extends Component {

	constructor() {
		super();
		this.state = {
			alert: constant.nil
		}
		window.setAlert = this.setAlert.bind(this);
	}

	setAlert(alert) {
		this.setState({
			alert
		})
	}

	showAlert() {
		var alert = this.state.alert;
		if (alert === constant.signup.valid)
			return (
				<div className="w3-container w3-green w3-xlarge w3-padding">
					<span className="w3-margin">{alert}</span>
					<button className="w3-btn w3-hover-none w3-right" style={{ padding: "0px" }} onClick={() => window.setAlert("")}>&times;</button>
				</div>
			)
		else if (alert)
			return (
				<div className="w3-container w3-red w3-xlarge w3-padding">
					<span className="w3-margin">{alert}</span>
					<button className="w3-btn w3-hover-none w3-right" style={{ padding: "0px" }} onClick={() => window.setAlert("")}>&times;</button>
				</div>
			)
	}

	render() {
		return (
			<div>
				{this.showAlert()}
				<Router>
					<Route exact path="/" component={component.home} />
					<Route exact path="/about" component={component.about} />
					<Route exact path="/services" component={component.services} />
					<Route exact path="/login" component={component.login} />
					<Route exact path="/register" component={component.register} />
				</Router>
			</div>
		);
	}
}

export default App;
