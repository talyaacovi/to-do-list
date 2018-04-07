import React, { Component } from 'react';
import { Form } from './Form';
import { Test } from './Test';
import { Link } from 'react-router-dom';


export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { loggedIn: false };
	}

	handleSubmit(email, password) {
		let payload = new FormData();
		payload.append('email', email)
		payload.append('password', password);

		fetch('/login', {
			method: 'POST',
			body: payload,
			credentials: 'same-origin'
		})
		.then((response) => response.json())
		.then((data) => {
				if (data === 'success') {
					this.setState({ loggedIn: true });
				} else {
					console.log('wrong password');
				}
		});
	}

	render() {
		let page;
		if (this.state.loggedIn) {
			page = <Test />
		} else {
			page =
				<div>
					<Form onSubmit={this.handleSubmit.bind(this)} btn='Login'/>
					<p>Don't have an account? Create one <Link to='/signup'>here</Link></p>
				</div>
		}

		return (
				<div>
					<h1>Manage Your Daily Tasks</h1>
					{page}
				</div>
			)
	}
}