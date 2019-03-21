import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import component from './components'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Route exact path="/" component={component.home}/>
				</Router>
			</div>
		);
	}
}

export default App;
