import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import component from './components'

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Route exact path="/" component={component.home} />
					<Route exact path="/about" component={component.about} />
					<Route exact path="/services" component={component.services} />
				</Router>
			</div>
		);
	}
}

export default App;
