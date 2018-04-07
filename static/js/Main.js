import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import { Signup } from './Signup';
import { Test } from './Test';


class Main extends Component {
	render() {
		return (
				
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/signup' component={Signup}/>
				<Route path='/some-page' component={Test}/>
			</Switch>
			)
	}
}

export default Main;